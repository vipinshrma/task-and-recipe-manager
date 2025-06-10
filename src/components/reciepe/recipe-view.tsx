'use client'
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useDebounce } from "@/hooks/use-debounce"
import { Loader } from "../global/loader"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IngredientView } from "./ingredient-view"
import Image from "next/image"

interface Recipe {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strInstructions: string
  strArea: string
  strCategory: string
  [key: string]: string // For dynamic ingredient access
}

const fetchRecipes = async (searchTerm = '') => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
  const data = await response.json()
  return data.meals || []
}

const getIngredients = (recipe: Recipe): string => {
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`]
    const measure = recipe[`strMeasure${i}`]
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push(`${ingredient}${measure ? ` (${measure})` : ''}`)
    }
  }
  return ingredients.join(', ')
}

const formatInstructions = (instructions: string): string => {
  // Split instructions by new lines and periods
  const steps = instructions.split(/\n|\. /).filter(step => step.trim() !== '');
  // Add step numbers and format
  return steps.map((step, index) => `${index + 1}. ${step.trim()}`).join('\n');
}

export function RecipeView() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500) // 500ms debounce
  
  const { data: recipes, isLoading, isError, isFetching } = useQuery<Recipe[]>({
    queryKey: ['recipes', debouncedSearchTerm],
    queryFn: () => fetchRecipes(debouncedSearchTerm),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    refetchOnWindowFocus: false,
  })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  if (isError) {
    return <div className="p-6 text-red-500">Error loading recipes</div>
  }

  return (
    <div className="flex flex-col w-full">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Recipes</h1>
          <div className="w-full max-w-md relative">
            <Input
              type="text"
              placeholder="Search recipes by name..."
              value={searchTerm}
              onChange={handleSearch}
            />
            {isFetching && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
              </div>
            )}
          </div>
        </div>
        {isFetching ? (
          <Loader/>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Ingredients</TableHead>
                <TableHead>Instructions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recipes?.map((recipe) => (
                <TableRow key={recipe.idMeal}>
                  <TableCell>
                    <div className="w-20 h-20 relative">
                      <Image
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{recipe.strMeal}</TableCell>
                  <TableCell className="max-w-[300px] line-clamp-3">
                    {getIngredients(recipe)}
                  </TableCell>
                  <TableCell className="max-w-[500px] whitespace-pre-line">
                    <IngredientView
                    ingredients={recipe.strInstructions}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}