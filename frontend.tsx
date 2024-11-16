"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SendHorizontal, Mic, Menu, CheckCircle2, MapPin, Users } from 'lucide-react'
import { useState, useEffect } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for influencers
const mockInfluencers = [
  { username: "@travel_guru", country: "USA", followers: 1500000, ranking: 1, platforms: ["instagram", "tiktok"] },
  { username: "@fitness_queen", country: "UK", followers: 1200000, ranking: 2, platforms: ["instagram"] },
  { username: "@tech_wizard", country: "Japan", followers: 1000000, ranking: 3, platforms: ["tiktok"] },
  { username: "@foodie_adventures", country: "Italy", followers: 800000, ranking: 4, platforms: ["instagram", "tiktok"] },
  { username: "@fashion_icon", country: "France", followers: 750000, ranking: 5, platforms: ["instagram"] },
  { username: "@nature_lover", country: "Canada", followers: 600000, ranking: 6, platforms: ["instagram", "tiktok"] },
  { username: "@music_maestro", country: "Germany", followers: 550000, ranking: 7, platforms: ["tiktok"] },
  { username: "@art_inspiration", country: "Spain", followers: 500000, ranking: 8, platforms: ["instagram"] },
  { username: "@wellness_guru", country: "Australia", followers: 450000, ranking: 9, platforms: ["instagram", "tiktok"] },
  { username: "@gaming_pro", country: "South Korea", followers: 400000, ranking: 10, platforms: ["tiktok"] },
];

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
);

function InfluencerBar({ influencer, index }) {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-[#0668E1] to-[#60D5FA] text-white font-bold rounded-full">
        {index + 1}
      </div>
      <Avatar className="w-12 h-12">
        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${influencer.username}`} alt={influencer.username} />
        <AvatarFallback>{influencer.username.slice(1, 3).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <h3 className="font-semibold text-lg">{influencer.username}</h3>
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="w-4 h-4 mr-1" />
          {influencer.country}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Users className="w-5 h-5 text-gray-400" />
        <span className="font-medium">{influencer.followers.toLocaleString()}</span>
      </div>
      <div className="flex space-x-2">
        {influencer.platforms.includes("instagram") && (
          <div className="text-pink-500">
            <InstagramIcon />
          </div>
        )}
        {influencer.platforms.includes("tiktok") && (
          <div className="text-black">
            <TikTokIcon />
          </div>
        )}
      </div>
      <div className="w-16 text-right">
        <span className="font-bold text-lg text-blue-600">#{influencer.ranking}</span>
      </div>
    </div>
  )
}

export default function Component() {
  const [inputValue, setInputValue] = useState("")
  const [isRibbonOpen, setIsRibbonOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [briefContent, setBriefContent] = useState("")
  const [region, setRegion] = useState("")
  const [budget, setBudget] = useState(10000)
  const [targetAge, setTargetAge] = useState("")
  const [customAgeRange, setCustomAgeRange] = useState([25, 35])
  const [loadingStep, setLoadingStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitted:", inputValue)
    setBriefContent(inputValue)
    setInputValue("")
    setCurrentStep(1) // Move to Brief page
  }

  const steps = ["User Input", "Brief Page", "Status Page", "Output Page"]

  useEffect(() => {
    if (currentStep === 2) {
      const stepDuration = 2000; // 2 seconds per step
      const progressInterval = 16; // Update progress every 16ms (smoother)
      const progressIncrement = 100 / (stepDuration / progressInterval);

      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          let newProgress;
          if (loadingStep === 0) {
            newProgress = Math.min(oldProgress + progressIncrement, 30);
          } else if (loadingStep === 1) {
            newProgress = Math.min(30 + oldProgress + progressIncrement, 75);
          } else {
            newProgress = Math.min(75 + oldProgress + progressIncrement, 100);
          }
          return newProgress;
        });
      }, progressInterval);

      const stepTimer = setTimeout(() => {
        if (loadingStep < 2) {
          setLoadingStep((prevStep) => prevStep + 1);
          setProgress(loadingStep === 0 ? 30 : 75);
        } else {
          clearInterval(timer);
          setProgress(100);
          setTimeout(() => setCurrentStep(3), 300); // Short delay before moving to Output Page
        }
      }, stepDuration);

      return () => {
        clearInterval(timer);
        clearTimeout(stepTimer);
      };
    }
  }, [currentStep, loadingStep]);

  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <Input
                className="w-full pl-4 pr-24 py-3 bg-gray-50 border-gray-200 focus:border-blue-300 text-gray-800 placeholder-gray-400 rounded-lg"
                placeholder="Ask anything about influencer marketing..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Voice input"
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button
                  type="submit"
                  size="icon"
                  className="bg-gradient-to-r from-[#0668E1] to-[#60D5FA] hover:from-[#0556BC] hover:to-[#4DBAE0] text-white rounded-full"
                  aria-label="Send message"
                >
                  <SendHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>
        )
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Brief</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="product-description">Product Description</Label>
                <Textarea
                  id="product-description"
                  className="w-full min-h-[100px] p-3 bg-gray-50 border-gray-200 focus:border-blue-300 text-gray-800 placeholder-gray-400 rounded-lg"
                  placeholder="Briefly describe your product..."
                  value={briefContent}
                  onChange={(e) => setBriefContent(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="region">Region</Label>
                <Select onValueChange={setRegion}>
                  <SelectTrigger id="region" className="w-full">
                    <SelectValue placeholder="Select a region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="north-america">North America</SelectItem>
                    <SelectItem value="europe">Europe</SelectItem>
                    <SelectItem value="asia">Asia</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="budget">Budget: ${budget.toLocaleString()}</Label>
                <Slider
                  id="budget"
                  min={1000}
                  max={100000}
                  step={1000}
                  value={[budget]}
                  onValueChange={(value) => setBudget(value[0])}
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="target-age">Target Age Range</Label>
                <Select onValueChange={setTargetAge}>
                  <SelectTrigger id="target-age" className="w-full">
                    <SelectValue placeholder="Select target age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="13-18">13-18</SelectItem>
                    <SelectItem value="18-25">18-25</SelectItem>
                    <SelectItem value="25-50">25-50</SelectItem>
                    <SelectItem value="50+">50+</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {targetAge === "custom" && (
                <div>
                  <Label htmlFor="custom-age-range">Custom Age Range: {customAgeRange[0]} - {customAgeRange[1]}</Label>
                  <Slider
                    id="custom-age-range"
                    min={13}
                    max={65}
                    step={1}
                    value={customAgeRange}
                    onValueChange={setCustomAgeRange}
                    className="w-full"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => setCurrentStep(2)}
                className="bg-gradient-to-r from-[#0668E1] to-[#60D5FA] hover:from-[#0556BC] hover:to-[#4DBAE0] text-white"
              >
                Next
              </Button>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-8 py-12">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">Processing Your Request</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <CheckCircle2 className={`h-6 w-6 ${loadingStep > 0 ? 'text-green-500' : 'text-gray-300'}`} />
                <span className={`text-lg ${loadingStep > 0 ? 'text-gray-800' : 'text-gray-500'}`}>Sending Data to AI model</span>
              </div>
              <div className="flex items-center space-x-4">
                <CheckCircle2 className={`h-6 w-6 ${loadingStep > 1 ? 'text-green-500' : 'text-gray-300'}`} />
                <span className={`text-lg ${loadingStep > 1 ? 'text-gray-800' : 'text-gray-500'}`}>Processing Response</span>
              </div>
              <div className="flex items-center space-x-4">
                <CheckCircle2 className={`h-6 w-6 ${loadingStep > 2 ? 'text-green-500' : 'text-gray-300'}`} />
                <span className={`text-lg ${loadingStep > 2 ? 'text-gray-800' : 'text-gray-500'}`}>Done!</span>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(to right, #0668E1, #60D5FA)',
                }}
              />
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Top Influencers for Your Campaign</h2>
            <div className="space-y-4">
              {mockInfluencers.map((influencer, index) => (
                <InfluencerBar key={influencer.username} influencer={influencer} index={index} />
              ))}
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => setCurrentStep(0)}
                className="bg-gradient-to-r from-[#0668E1] to-[#60D5FA] hover:from-[#0556BC] hover:to-[#4DBAE0] text-white"
              >
                Start New Search
              </Button>
            </div>
          </div>
        )
      default:
        return <div>Content for step {currentStep + 1}</div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F0FE] via-[#F0F8FF] to-[#F8FBFF] flex flex-col items-center justify-center p-4 pl-2 relative">
      <div className="absolute top-4 left-20 z-10">
        <h1 className="text-4xl font-extrabold tracking-tighter">
          <span className="bg-gradient-to-r from-[#0668E1] to-[#60D5FA] bg-clip-text text-transparent">
            Scouty.io
          </span>
        </h1>
      </div>
      <div className="w-full max-w-2xl mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            {steps.map((step, index) => (
              <BreadcrumbItem key={step}>
                <BreadcrumbLink 
                  href="#" 
                  className={`text-sm font-medium ${index <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}
                  onClick={() => setCurrentStep(index)}
                >
                  {step}
                </BreadcrumbLink>
                {index < steps.length - 1 && <BreadcrumbSeparator />}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Card className="w-full max-w-2xl bg-white shadow-xl border border-blue-100">
        <CardContent className="p-6">
          {renderContent()}
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          Scouty.io uses AI to provide insights and connections in the creator economy.
        </CardFooter>
      </Card>
      <HamburgerRibbon isOpen={isRibbonOpen} setIsOpen={setIsRibbonOpen} />
    </div>
  )
}

function HamburgerRibbon({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-16 bg-gradient-to-b from-[#0668E1] to-[#60D5FA] transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-14'
      }`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="h-full flex flex-col items-center pt-4">
        <Button
          size="icon"
          variant="ghost"
          className="text-white hover:bg-white/20"
          aria-label="Menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
