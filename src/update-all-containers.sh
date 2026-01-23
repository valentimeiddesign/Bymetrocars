#!/bin/bash

# Update all old container patterns to new standard

# Pattern 1: Update content containers
find . -name "*.tsx" -type f ! -path "./node_modules/*" -exec sed -i '' 's/w-full max-w-\[1920px\] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32/w-full max-w-[2304px] mx-auto px-4 md:px-8 xl:px-[164px]/g' {} +

# Pattern 2: Update header containers (add max-w and mx-auto)
find . -name "*.tsx" -type f ! -path "./node_modules/*" -exec sed -i '' 's/flex items-center justify-between h-full px-4 md:px-8 lg:px-20/max-w-[2304px] mx-auto flex items-center justify-between h-full px-4 md:px-8 xl:px-[164px]/g' {} +

# Pattern 3: Update simple containers without flex
find . -name "*.tsx" -type f ! -path "./node_modules/*" -exec sed -i '' 's/w-full px-4 md:px-8 lg:px-20/w-full max-w-[2304px] mx-auto px-4 md:px-8 xl:px-[164px]/g' {} +

echo "All containers updated successfully!"
