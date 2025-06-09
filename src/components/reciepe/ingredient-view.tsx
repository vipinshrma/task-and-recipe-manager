'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface IngredientViewProps {
  ingredients: string
}

const formatInstructions = (instructions: string): string => {
  // Split instructions by new lines and periods
  const steps = instructions.split(/\n|\. /).filter(step => step.trim() !== '');
  // Add step numbers and format
  return steps.map((step, index) => `${index + 1}. ${step.trim()}`).join('\n');
}

export function IngredientView({ ingredients }: IngredientViewProps) {
  const [showMore, setShowMore] = useState(false)
  const formattedInstructions = formatInstructions(ingredients)
  const isLongText = formattedInstructions.split('\n').length > 5

  const toggleShowMore = () => {
    setShowMore(!showMore)
  }

  return (
    <div className="w-full max-w-lg space-y-3">
      <div className={`whitespace-pre-line ${!showMore && isLongText ? 'line-clamp-5' : ''}`}>
        {formattedInstructions}
      </div>
      {isLongText && (
        <Button
          variant="link"
          size="sm"
          className={`p-0 h-auto transition-colors ${
            showMore ? 'text-primary hover:text-primary/80' : 'text-blue-600 hover:text-blue-800'
          }`}
          onClick={toggleShowMore}
        >
          {showMore ? 'Show less' : 'Show more'}
        </Button>
      )}
    </div>
  )
}
