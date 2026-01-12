#!/bin/bash

# Update all container classes to match Figma design
find . -name "*.tsx" -type f -exec sed -i 's/w-full max-w-\[1920px\] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32/w-full max-w-[2304px] mx-auto px-4 md:px-8 xl:px-[164px]/g' {} +

echo "Containers updated successfully!"
