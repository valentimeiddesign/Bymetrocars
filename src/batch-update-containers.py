#!/usr/bin/env python3
import re
import glob

# Define the replacements
replacements = [
    # Content containers
    (
        r'w-full max-w-\[1920px\] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32',
        r'w-full max-w-[2304px] mx-auto px-4 md:px-8 xl:px-[164px]'
    ),
    # Header containers with flex
    (
        r'flex items-center justify-between h-full px-4 md:px-8 lg:px-20',
        r'max-w-[2304px] mx-auto flex items-center justify-between h-full px-4 md:px-8 xl:px-[164px]'
    ),
    # Simple containers
    (
        r'w-full px-4 md:px-8 lg:px-20(?!\s*2xl)',
        r'w-full max-w-[2304px] mx-auto px-4 md:px-8 xl:px-[164px]'
    ),
]

# Find all TSX files
files = glob.glob('./**/*.tsx', recursive=True)
files = [f for f in files if 'node_modules' not in f]

updated_count = 0

for file_path in files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Apply all replacements
        for old_pattern, new_pattern in replacements:
            content = re.sub(old_pattern, new_pattern, content)
        
        # Only write if content changed
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated: {file_path}")
            updated_count += 1
    
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

print(f"\nTotal files updated: {updated_count}")
