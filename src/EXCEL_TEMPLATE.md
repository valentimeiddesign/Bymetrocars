# Excel Template for Car Import

## 📋 Columns (Headers)

Your Excel file should have these columns in the first row:

```
Make | Model | Year | Price | Mileage | Status | Type | VIN | Color | Transmission | Fuel Type | Location | Images | Description | Features | Body Style | Engine | Drivetrain | Exterior Color | Interior Color | Doors | Seats
```

## ✅ Example Data

Here are 5 example rows for your Excel file:

| Make | Model | Year | Price | Mileage | Status | Type | VIN | Color | Transmission | Fuel Type | Location | Images | Description | Features | Body Style | Engine | Drivetrain | Exterior Color | Interior Color | Doors | Seats |
|------|-------|------|-------|---------|--------|------|-----|-------|--------------|-----------|----------|--------|-------------|----------|------------|--------|------------|----------------|----------------|-------|-------|
| Honda | Civic | 2022 | 25900 | 15000 | Available | Sedan | 1HGBH41JXMN109186 | Silver | Automatic | Gasoline | 332 Sackville Drive | https://example.com/img1.jpg | Great condition, one owner | GPS, Leather Seats, Sunroof | Sedan | 2.0L 4-Cylinder | FWD | Silver Metallic | Black Leather | 4 | 5 |
| Toyota | Camry | 2023 | 32500 | 8000 | Available | Sedan | 4T1BF1FK5HU123456 | Blue | Automatic | Hybrid | 400 Sackville Drive | https://example.com/img2.jpg | Low mileage, hybrid engine | Backup Camera, Bluetooth, Cruise Control | Sedan | 2.5L Hybrid | FWD | Blue Pearl | Gray Cloth | 4 | 5 |
| Ford | F-150 | 2021 | 42000 | 25000 | Reserved | Truck | 1FTFW1E84MFA12345 | Red | Automatic | Gasoline | Buy Metro | https://example.com/img3.jpg | Work-ready pickup truck | 4WD, Towing Package, Bed Liner | Pickup | 5.0L V8 | 4WD | Red | Black Vinyl | 4 | 6 |
| BMW | 3 Series | 2022 | 38900 | 12000 | Sold | Sedan | WBA8E9G59HNU12345 | Black | Automatic | Gasoline | Phillips Auto | https://example.com/img4.jpg | Luxury sedan with premium features | Navigation, Premium Sound, Heated Seats | Sedan | 2.0L Turbo | RWD | Black | Beige Leather | 4 | 5 |
| Jeep | Wrangler | 2020 | 35900 | 32000 | Available | SUV | 1C4HJXDG0LW123456 | Green | Manual | Gasoline | Mount Uniacke | https://example.com/img5.jpg | Off-road ready, manual transmission | 4WD, Removable Top, Winch | SUV | 3.6L V6 | 4WD | Forest Green | Black Cloth | 2 | 4 |

## 📝 Field Descriptions

### Required Fields (Must have values)

1. **Make** - Car manufacturer (Honda, Toyota, Ford, etc.)
2. **Model** - Car model (Civic, Camry, F-150, etc.)
3. **Year** - Year of manufacture (1900-2026)
4. **Price** - Price in dollars (no commas, just numbers: 25900)
5. **Mileage** - Mileage in miles (no commas, just numbers: 15000)

### Recommended Fields

6. **Status** - Current status
   - Available
   - Sold
   - Reserved
   - Service
   - Pending

7. **Type** - Vehicle type
   - Sedan
   - SUV
   - Truck
   - Coupe
   - Hatchback
   - Van

8. **Location** - Dealership location
   - 332 Sackville Drive
   - 400 Sackville Drive
   - Buy Metro
   - Phillips Auto
   - Mount Uniacke
   - Lower Sackville
   - Truro

9. **Transmission** - Transmission type
   - Automatic
   - Manual

10. **Fuel Type** - Fuel type
    - Gasoline
    - Diesel
    - Electric
    - Hybrid

### Optional Fields

11. **VIN** - Vehicle Identification Number (17 characters)
12. **Color** - General color
13. **Images** - Image URLs separated by commas: `https://img1.jpg, https://img2.jpg`
14. **Description** - Detailed description of the vehicle
15. **Features** - Features separated by commas: `GPS, Leather Seats, Sunroof`
16. **Body Style** - Body style description
17. **Engine** - Engine specification (2.0L 4-Cylinder)
18. **Drivetrain** - Drivetrain type (FWD, RWD, AWD, 4WD)
19. **Exterior Color** - Detailed exterior color
20. **Interior Color** - Detailed interior color
21. **Doors** - Number of doors (2, 4, etc.)
22. **Seats** - Number of seats (2, 4, 5, 7, etc.)

## 🚨 Important Notes

### Data Formatting

- **Numbers**: No commas, no currency symbols
  - ✅ Correct: `25900`
  - ❌ Wrong: `$25,900` or `25,900`

- **Year**: Must be between 1900 and current year + 2
  - ✅ Correct: `2022`
  - ❌ Wrong: `22` or `1850`

- **Status**: Exact match required (case-insensitive)
  - ✅ Correct: `Available` or `available`
  - ❌ Wrong: `In Stock` or `For Sale`

- **Type**: Exact match required
  - ✅ Correct: `Sedan`, `SUV`, `Truck`
  - ❌ Wrong: `Car`, `Vehicle`

- **Images**: Multiple URLs separated by comma and space
  - ✅ Correct: `https://img1.jpg, https://img2.jpg`
  - ❌ Wrong: `https://img1.jpg,https://img2.jpg` (no space)

- **Features**: Separated by commas
  - ✅ Correct: `GPS, Leather, Sunroof`
  - ❌ Wrong: `GPS; Leather; Sunroof`

### Common Mistakes to Avoid

1. ❌ Empty required fields (Make, Model, Year, Price, Mileage)
2. ❌ Invalid year (e.g., 1800 or 2050)
3. ❌ Negative prices or mileage
4. ❌ Wrong Status values (use only: Available, Sold, Reserved, Service, Pending)
5. ❌ Wrong Type values (use only: Sedan, SUV, Truck, Coupe, Hatchback, Van)
6. ❌ Invalid Location (must match one of the 7 locations exactly)
7. ❌ Extra spaces in column headers
8. ❌ Duplicate VINs

## 📥 How to Use This Template

1. **Create Excel file**: Open Excel and create a new workbook
2. **Add headers**: Copy the column names from above into the first row
3. **Add data**: Add your car data starting from row 2
4. **Validate data**: Check all required fields are filled
5. **Save**: Save as `.xlsx` or `.xls` format
6. **Import**: Use the Admin Panel Import feature to upload

## 💡 Tips for Best Results

- Use consistent formatting across all rows
- Double-check VIN numbers for uniqueness
- Provide high-quality image URLs
- Write clear, descriptive descriptions
- Include popular features to attract buyers
- Keep locations consistent with your dealership list

## 🔗 Need Help?

- Read the full setup guide: `/SUPABASE_SETUP.md`
- Check API documentation: `/utils/carApi.ts`
- View import code: `/utils/excelImport.ts`

---

**Ready to import?** Prepare your Excel file following this format and use the Import feature in the Admin Panel!
