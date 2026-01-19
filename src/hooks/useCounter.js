import { useState, useEffect } from 'react'

export function useCounter(targetValue, duration = 2000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const steps = 60
    const increment = targetValue / steps
    const stepDuration = duration / steps
    let currentValue = 0

    const timer = setInterval(() => {
      currentValue += increment
      if (currentValue >= targetValue) {
        setCount(targetValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(currentValue))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [targetValue, duration])

  return count
}
