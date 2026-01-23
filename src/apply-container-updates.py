#!/usr/bin/env python3
"""
Batch update script to standardize all container classes across the project.
Updates old container patterns to the new 2304px standard.
"""

import re
import os

# Files to update
files_to_update = [
    './App.tsx',
    './components/Contacts.tsx',
    './components/Financing.tsx',
    './components/Locations.tsx',
    './components/Navigation.tsx',
    './components/Quiz.tsx',
    './components/SellTrade.tsx',
    './components/ShopCars.tsx',
    './components/Vacancies.tsx',
]

def update_file(filepath):
    """Update container classes in a file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        # Pattern 1: Old content containers 1920px -> 2304px
        content = re.sub(
            r'w-full max-w-\[1920px\] mx-auto px-4 md:px-8 lg:px-20 2xl:px-32',
            r'w-full max-w-[2304px] mx-auto px-4 md:px-8 xl:px-[164px]',
            content
        )
        
        # Pattern 2: Header containers - add max-w and mx-auto
        content = re.sub(
            r'(\s+)flex items-center justify-between h-full px-4 md:px-8 lg:px-20(["\s])',
            r'\1max-w-[2304px] mx-auto flex items-center justify-between h-full px-4 md:px-8 xl:px-[164px]\2',
            content
        )
        
        # Pattern 3: Simple w-full containers without 2xl breakpoint
        content = re.sub(
            r'w-full px-4 md:px-8 lg:px-20(?!\s*2xl)',
            r'w-full max-w-[2304px] mx-auto px-4 md:px-8 xl:px-[164px]',
            content
        )
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'✓ Updated: {filepath}')
            return True
        else:
            print(f'⊘ No changes needed: {filepath}')
            return False
            
    except FileNotFoundError:
        print(f'✗ File not found: {filepath}')
        return False
    except Exception as e:
        print(f'✗ Error updating {filepath}: {e}')
        return False

def main():
    """Main execution function."""
    print('Starting container standardization...\n')
    
    updated_count = 0
    for filepath in files_to_update:
        if update_file(filepath):
            updated_count += 1
    
    print(f'\n✓ Complete! Updated {updated_count}/{len(files_to_update)} files.')
    print('All containers now use: max-w-[2304px] mx-auto px-4 md:px-8 xl:px-[164px]')

if __name__ == '__main__':
    main()
