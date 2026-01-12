#!/usr/bin/env python3
import os
import re

# Define the pattern and replacement
old_pattern = r'w-full max-w-\[1920px\] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32'
new_pattern = r'w-full max-w-[2304px] mx-auto px-4 md:px-8 xl:px-[164px]'

# List of files to update
files_to_update = [
    '/App.tsx',
    '/components/AboutUs.tsx',
    '/components/Financing.tsx',
    '/components/SellTrade.tsx',
    '/components/ShopCars.tsx',
    '/components/Contacts.tsx',
    '/components/Locations.tsx',
    '/components/Vacancies.tsx',
    '/components/TopBanner.tsx',
    '/components/Quiz.tsx',
    '/components/Footer.tsx',
    '/components/FilterSection.tsx',
]

for file_path in files_to_update:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace the pattern
        updated_content = content.replace(old_pattern, new_pattern)
        
        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        
        print(f"✓ Updated: {file_path}")
    except Exception as e:
        print(f"✗ Error updating {file_path}: {e}")

print("\n✅ All containers updated successfully!")
