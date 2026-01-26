import React, { useState } from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { Icons } from './Icons';
import { TopBanner } from './TopBanner';
import imgFordSedan from "figma:asset/62436b94333b992271b2bd63a2d69bb6c9ee5f70.png";
import imgTruck from "figma:asset/cd2eb872b42b5e9801120c8e75a8370637bdc5b0.png";
import imgSUV from "figma:asset/71af0fa3a4b700260f35013dcb6a6592ecc75611.png";
import imgVAN from "figma:asset/4b62f68fb822a2364522d1cdabaf969ad53d4d90.png";

interface QuizProps {
  onNavigate?: (page: string) => void;
}

export function Quiz({ onNavigate }: QuizProps = {}) {
  const [companyMenuOpen, setCompanyMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;
  const [isVerificationStep, setIsVerificationStep] = useState(false);

  // Form state
  const [vehicleType, setVehicleType] = useState<VehicleType>(null);
  const [budget, setBudget] = useState<BudgetRange>(null);
  const [moneyDown, setMoneyDown] = useState<MoneyDown>(null);
  const [employmentStatus, setEmploymentStatus] = useState<EmploymentStatus>(null);
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [hasTradeIn, setHasTradeIn] = useState<boolean | null>(null);
  const [consentChecked, setConsentChecked] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    province: '',
    age: ''
  });

  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitToVerification = () => {
    if (consentChecked) {
      setIsVerificationStep(true);
    }
  };

  const handleVerify = () => {
    // Handle verification
    console.log('Verification code:', verificationCode);
    alert('Application verified and submitted successfully!');
  };

  const handleResendCode = () => {
    alert('Verification code resent to your phone/email');
  };

  // Vehicle images - using placeholder emojis, can be replaced with actual images
  const vehicleImages = {
    car: '🚗',
    truck: '🚙',
    suv: '🚐',
    van: '🚌'
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="text-[rgb(51,_51,_51)] text-[14px] leading-[20px]" style={{"fontFamily":"Figtree, sans-serif"}}>
        
      <Breadcrumbs 
        items={[{ label: 'Get Approved' }]} 
        onNavigate={onNavigate || (() => {})} 
      />

      {/* Quiz Section */}
      <div className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          {/* Step 1: Vehicle Type */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-2xl md:text-3xl font-semibold text-[rgb(5,15,35)]">
                  Looking to finance your next car?
                </h1>
                <p className="text-[rgb(51,51,51)] text-base">
                  Check your options with no impact on your credit score.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[rgb(139,130,246)] h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Vehicle Selection */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => setVehicleType('car')}
                  className={`p-6 border-2 rounded-[12px] flex flex-col items-center gap-4 transition-all ${
                    vehicleType === 'car' 
                      ? 'border-[rgb(139,130,246)] bg-[rgba(139,130,246,0.05)]' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-full h-20 flex items-center justify-center overflow-hidden">
                    <img src={imgFordSedan} alt="Car" className="w-full h-full object-contain" />
                  </div>
                  <span className="bg-[rgb(69,106,236)] text-white px-4 py-2 rounded-full text-sm font-medium">
                    I want a Car
                  </span>
                </button>

                <button
                  onClick={() => setVehicleType('truck')}
                  className={`p-6 border-2 rounded-[12px] flex flex-col items-center gap-4 transition-all ${
                    vehicleType === 'truck' 
                      ? 'border-[rgb(139,130,246)] bg-[rgba(139,130,246,0.05)]' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-full h-20 flex items-center justify-center overflow-hidden">
                    <img src={imgTruck} alt="Truck" className="w-full h-full object-contain" />
                  </div>
                  <span className="bg-[rgb(69,106,236)] text-white px-4 py-2 rounded-full text-sm font-medium">
                    I want a Truck
                  </span>
                </button>

                <button
                  onClick={() => setVehicleType('suv')}
                  className={`p-6 border-2 rounded-[12px] flex flex-col items-center gap-4 transition-all ${
                    vehicleType === 'suv' 
                      ? 'border-[rgb(139,130,246)] bg-[rgba(139,130,246,0.05)]' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-full h-20 flex items-center justify-center overflow-hidden">
                    <img src={imgSUV} alt="SUV" className="w-full h-full object-contain" />
                  </div>
                  <span className="bg-[rgb(69,106,236)] text-white px-4 py-2 rounded-full text-sm font-medium">
                    I want a SUV
                  </span>
                </button>

                <button
                  onClick={() => setVehicleType('van')}
                  className={`p-6 border-2 rounded-[12px] flex flex-col items-center gap-4 transition-all ${
                    vehicleType === 'van' 
                      ? 'border-[rgb(139,130,246)] bg-[rgba(139,130,246,0.05)]' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-full h-20 flex items-center justify-center overflow-hidden">
                    <img src={imgVAN} alt="Van" className="w-full h-full object-contain" />
                  </div>
                  <span className="bg-[rgb(69,106,236)] text-white px-4 py-2 rounded-full text-sm font-medium">
                    I want a Van
                  </span>
                </button>
              </div>

              <button
                onClick={handleNext}
                disabled={!vehicleType}
                className="w-full bg-[rgb(69,106,236)] text-white py-3 px-6 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgb(59,96,226)] transition-colors"
              >
                Next
              </button>
            </div>
          )}

          {/* Step 2: Monthly Budget */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-2xl md:text-3xl font-semibold text-[rgb(5,15,35)]">
                  What's your monthly budget?
                </h1>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[rgb(139,130,246)] h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Budget Selection */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setBudget('$250-$374')}
                  className={`p-6 border-2 rounded-full text-center transition-all ${
                    budget === '$250-$374' 
                      ? 'border-[rgb(139,130,246)] bg-[rgba(139,130,246,0.05)]' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-lg font-medium text-[rgb(5,15,35)]">$250 - $374</span>
                </button>

                <button
                  onClick={() => setBudget('$375-$499')}
                  className={`p-6 border-2 rounded-full text-center transition-all ${
                    budget === '$375-$499' 
                      ? 'border-[rgb(139,130,246)] bg-[rgba(139,130,246,0.05)]' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-lg font-medium text-[rgb(5,15,35)]">$375 - $499</span>
                </button>

                <button
                  onClick={() => setBudget('$500-$750')}
                  className={`p-6 border-2 rounded-full text-center transition-all ${
                    budget === '$500-$750' 
                      ? 'border-[rgb(139,130,246)] bg-[rgba(139,130,246,0.05)]' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-lg font-medium text-[rgb(5,15,35)]">$500 - $750</span>
                </button>

                <button
                  onClick={() => setBudget('$750+')}
                  className={`p-6 border-2 rounded-full text-center transition-all ${
                    budget === '$750+' 
                      ? 'border-[rgb(139,130,246)] bg-[rgba(139,130,246,0.05)]' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-lg font-medium text-[rgb(5,15,35)]">$750 or More</span>
                </button>
              </div>

              <p className="text-center text-sm text-gray-500">
                Let us help you find vehicles eligible for financing within your monthly budget.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="w-full bg-gray-200 text-[rgb(5,15,35)] py-3 px-6 rounded-full font-medium hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!budget}
                  className="w-full bg-[rgb(69,106,236)] text-white py-3 px-6 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgb(59,96,226)] transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Money Down */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-2xl md:text-3xl font-semibold text-[rgb(5,15,35)]">
                  Money Down:
                </h1>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[rgb(139,130,246)] h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Money Down Selection */}
              <div className="grid grid-cols-2 gap-4">
                {['$0', '$500', '$1000', '$2000', '$3000', '$4000+'].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setMoneyDown(amount as MoneyDown)}
                    className={`p-6 border-2 rounded-full text-center transition-all ${
                      moneyDown === amount 
                        ? 'border-[rgb(139,130,246)] bg-[rgba(139,130,246,0.05)]' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-lg font-medium text-[rgb(5,15,35)]">{amount}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="w-full bg-gray-200 text-[rgb(5,15,35)] py-3 px-6 rounded-full font-medium hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!moneyDown}
                  className="w-full bg-[rgb(69,106,236)] text-white py-3 px-6 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgb(59,96,226)] transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Employment Status */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-2xl md:text-3xl font-semibold text-[rgb(5,15,35)]">
                  Employed Status
                </h1>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[rgb(139,130,246)] h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Employment Status Selection */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setEmploymentStatus('employed')}
                  className={`p-6 border-2 rounded-full text-center transition-all ${
                    employmentStatus === 'employed' 
                      ? 'border-[rgb(139,130,246)] bg-[rgba(139,130,246,0.05)]' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-base font-medium text-[rgb(5,15,35)]">Employed</span>
                </button>

                <button
                  onClick={() => setEmploymentStatus('self-employed')}
                  className={`p-6 border-2 rounded-full text-center transition-all ${
                    employmentStatus === 'self-employed' 
                      ? 'border-[rgb(139,130,246)] bg-[rgba(139,130,246,0.05)]' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-base font-medium text-[rgb(5,15,35)]">Self-Employed</span>
                </button>

                <button
                  onClick={() => setEmploymentStatus('retired')}
                  className={`p-6 border-2 rounded-full text-center transition-all ${
                    employmentStatus === 'retired' 
                      ? 'border-[rgb(139,130,246)] bg-[rgba(139,130,246,0.05)]' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-base font-medium text-[rgb(5,15,35)]">Retired</span>
                </button>

                <button
                  onClick={() => setEmploymentStatus('long-term-disability')}
                  className={`p-6 border-2 rounded-full text-center transition-all ${
                    employmentStatus === 'long-term-disability' 
                      ? 'border-[rgb(139,130,246)] bg-[rgba(139,130,246,0.05)]' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-base font-medium text-[rgb(5,15,35)]">Long-Term Disability</span>
                </button>

                <button
                  onClick={() => setEmploymentStatus('other')}
                  className={`p-6 border-2 rounded-full text-center transition-all col-span-2 ${
                    employmentStatus === 'other' 
                      ? 'border-[rgb(139,130,246)] bg-[rgba(139,130,246,0.05)]' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-base font-medium text-[rgb(5,15,35)]">Other</span>
                </button>
              </div>

              <p className="text-center text-sm text-gray-500">
                The status of your employment helps us determine the appropriate loan program for you. This should be your most significant source of monthly income. You can provide other monthly income sources later in the application.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="w-full bg-gray-200 text-[rgb(5,15,35)] py-3 px-6 rounded-full font-medium hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!employmentStatus}
                  className="w-full bg-[rgb(69,106,236)] text-white py-3 px-6 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgb(59,96,226)] transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Monthly Income */}
          {currentStep === 5 && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-2xl md:text-3xl font-semibold text-[rgb(5,15,35)]">
                  Monthly income before tax:
                </h1>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[rgb(139,130,246)] h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Income Input */}
              <div className="max-w-md mx-auto">
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  placeholder="$0.00"
                  className="w-full p-4 border-2 border-gray-300 rounded-lg text-center text-xl font-medium focus:border-[rgb(139,130,246)] focus:outline-none"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="w-full bg-gray-200 text-[rgb(5,15,35)] py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!monthlyIncome || parseFloat(monthlyIncome) <= 0}
                  className="w-full bg-[rgb(69,106,236)] text-white py-3 px-6 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgb(59,96,226)] transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 6: Trade-In */}
          {currentStep === 6 && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-2xl md:text-3xl font-semibold text-[rgb(5,15,35)]">
                  Do you have a vehicle to trade in?
                </h1>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[rgb(139,130,246)] h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Trade-In Selection */}
              <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                <button
                  onClick={() => setHasTradeIn(true)}
                  className={`p-6 border-2 rounded-lg text-center transition-all ${
                    hasTradeIn === true 
                      ? 'border-[rgb(139,130,246)] bg-[rgba(139,130,246,0.05)]' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-base font-medium text-[rgb(5,15,35)]">Yes, I want to trade it in</span>
                </button>

                <button
                  onClick={() => setHasTradeIn(false)}
                  className={`p-6 border-2 rounded-lg text-center transition-all ${
                    hasTradeIn === false 
                      ? 'border-[rgb(139,130,246)] bg-[rgba(139,130,246,0.05)]' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-base font-medium text-[rgb(5,15,35)]">No</span>
                </button>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="w-full bg-gray-200 text-[rgb(5,15,35)] py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={hasTradeIn === null}
                  className="w-full bg-[rgb(69,106,236)] text-white py-3 px-6 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgb(59,96,226)] transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 7: Contact Information */}
          {currentStep === 7 && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-2xl md:text-3xl font-semibold text-[rgb(5,15,35)]">
                  Contact Information
                </h1>
                <p className="text-[rgb(51,51,51)] text-base">
                  We're almost done! Please provide your contact details.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[rgb(139,130,246)] h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Contact Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[rgb(5,15,35)] mb-2">
                      First name:
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      placeholder="First Name"
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-[rgb(139,130,246)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[rgb(5,15,35)] mb-2">
                      Last name:
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      placeholder="Last Name"
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-[rgb(139,130,246)] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Phone number"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-[rgb(139,130,246)] focus:outline-none"
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Email Address"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-[rgb(139,130,246)] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={formData.province}
                    onChange={(e) => setFormData({...formData, province: e.target.value})}
                    placeholder="Province"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-[rgb(139,130,246)] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    placeholder="Age: dd / mm / yyyy"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-[rgb(139,130,246)] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="w-full bg-gray-200 text-[rgb(5,15,35)] py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!formData.firstName || !formData.lastName || !formData.phone || !formData.email}
                  className="w-full bg-[rgb(69,106,236)] text-white py-3 px-6 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgb(59,96,226)] transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 8: Consent & Verification */}
          {currentStep === 8 && !isVerificationStep && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-2xl md:text-3xl font-semibold text-[rgb(5,15,35)]">
                  Terms & Conditions
                </h1>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[rgb(139,130,246)] h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Consent Checkbox */}
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex gap-3 items-start p-6 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    className="mt-1 w-4 h-4 text-[rgb(139,130,246)] border-gray-300 rounded focus:ring-[rgb(139,130,246)]"
                  />
                  <label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed">
                    By checking this box, I consent, as of today's date, to the following: I authorize Buy Metro Pre-Owned to collect and use my information to process this financing application, verify my identity for fraud prevention, and contact me about my application. My information may be handled by Buy Metro Pre-Owned and its service providers (e.g., hosting, messaging, verification, CRM) solely for these purposes. This step does not request a credit report and does not affect my credit score. See our Terms of Service and Privacy Policy.
                  </label>
                </div>

                <p className="text-sm text-gray-500 italic text-center">
                  In this block, the form can only be submitted after the checkbox is selected.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="w-full bg-gray-200 text-[rgb(5,15,35)] py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmitToVerification}
                  disabled={!consentChecked}
                  className="w-full bg-[rgb(69,106,236)] text-white py-3 px-6 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgb(59,96,226)] transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          )}

          {/* Step 8: Verification Code */}
          {currentStep === 8 && isVerificationStep && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-2xl md:text-3xl font-semibold text-[rgb(5,15,35)]">
                  Enter Verification Code
                </h1>
                <p className="text-[rgb(51,51,51)] text-sm">
                  By completing this quick verification, you confirm it's really you and allow our team to reach you at your verified number with your approval details
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[rgb(139,130,246)] h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Verification Input */}
              <div className="max-w-md mx-auto space-y-4">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="123456"
                  className="w-full p-4 border-2 border-gray-300 rounded-lg text-center text-xl font-medium focus:border-[rgb(139,130,246)] focus:outline-none"
                />
                
                <button
                  onClick={handleResendCode}
                  className="w-full text-[rgb(139,130,246)] text-sm hover:underline"
                >
                  Resend code
                </button>
              </div>

              <button
                onClick={handleVerify}
                disabled={!verificationCode || verificationCode.length < 4}
                className="w-full max-w-md mx-auto block bg-[rgb(69,106,236)] text-white py-3 px-6 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgb(59,96,226)] transition-colors"
              >
                Verify
              </button>

              <p className="text-xs text-gray-400 italic text-center">
                Фіолетова кнопка, білий шрифт
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Browse by Type Section */}
      <div className="bg-white py-12 md:py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-[rgb(5,15,35)] mb-8">
            Browse by Type
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <button className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
              <div className="w-full h-20 flex items-center justify-center">
                <span className="text-4xl group-hover:scale-110 transition-transform">🚗</span>
              </div>
              <span className="text-sm font-medium text-[rgb(5,15,35)]">Sedan</span>
            </button>

            <button className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
              <div className="w-full h-20 flex items-center justify-center">
                <span className="text-4xl group-hover:scale-110 transition-transform">🚙</span>
              </div>
              <span className="text-sm font-medium text-[rgb(5,15,35)]">SUV</span>
            </button>

            <button className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
              <div className="w-full h-20 flex items-center justify-center">
                <span className="text-4xl group-hover:scale-110 transition-transform">🚐</span>
              </div>
              <span className="text-sm font-medium text-[rgb(5,15,35)]">Hatchback</span>
            </button>

            <button className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
              <div className="w-full h-20 flex items-center justify-center">
                <span className="text-4xl group-hover:scale-110 transition-transform">🚚</span>
              </div>
              <span className="text-sm font-medium text-[rgb(5,15,35)]">Truck</span>
            </button>

            <button className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
              <div className="w-full h-20 flex items-center justify-center">
                <span className="text-4xl group-hover:scale-110 transition-transform">🚌</span>
              </div>
              <span className="text-sm font-medium text-[rgb(5,15,35)]">VAN</span>
            </button>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-[rgb(5,15,35)] mb-6">
            Everything You Need to Know About Auto Financing at Buy Metro Pre-Owned
          </h2>

          <div className="space-y-4 text-[rgb(51,51,51)] leading-relaxed">
            <p className="font-medium">
              Looking for fast and flexible car financing in Halifax or anywhere across Nova Scotia?
            </p>
            <p>
              At Buy Metro Pre-Owned, we make getting approved easy — whether you have good credit, bad credit, or no credit today.
            </p>

            <p>
              We have relationships with over 9-10 major options (OAC) and competitive rates that fit your budget. You can apply online in minutes, and our team will review your information to help you find the best financing options for your budget and credit situation. If you'd like to explore your eligibility through our secure pre-qualification form available in the next step.
            </p>

            <p>
              We believe in a transparent, stress-free financing process. From your first application to your approval, our goal is to help you drive away easily and confidently in a car that suits your lifestyle and payments that work for you.
            </p>

            <p>
              Even if you've experienced bankruptcy or are new to Canada, we're here to help you rebuild your credit and get approved with confidence. Our finance specialists provide personalized approval options tailored to your current situation and goals.
            </p>

            <p>
              And no matter where you are — we offer fast vehicle delivery across all of Atlantic Canada, so your next car is only a few clicks away.
            </p>

            <p className="font-medium">
              Start your approval today — fast, secure, and designed for every credit type.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <button className="border-2 border-[rgb(139,130,246)] text-[rgb(139,130,246)] py-3 px-6 rounded-lg font-medium hover:bg-[rgba(139,130,246,0.05)] transition-colors">
              Get a trade offer
            </button>
            <button className="border-2 border-[rgb(139,130,246)] text-[rgb(139,130,246)] py-3 px-6 rounded-lg font-medium hover:bg-[rgba(139,130,246,0.05)] transition-colors">
              Shop Inventory
            </button>
          </div>
        </div>
      </div>


      </div>
    </div>
  );
}