import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ArrowRight, CheckCircle, FileText } from '@phosphor-icons/react'

type Step = 'agreement1' | 'agreement2' | 'complete'

function App() {
  const [step, setStep] = useState<Step>('agreement1')
  const [accepted1, setAccepted1] = useState(false)
  const [accepted2, setAccepted2] = useState(false)
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (step === 'complete') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [step])

  const progressValue = step === 'agreement1' ? 33 : step === 'agreement2' ? 66 : 100

  const handleContinue1 = () => {
    setStep('agreement2')
    setAccepted2(false)
  }

  const handleContinue2 = () => {
    setStep('complete')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="mb-6">
          <Progress value={progressValue} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          {step === 'agreement1' && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-lg">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="font-ui text-sm">
                      Step 1 of 3
                    </Badge>
                    <FileText size={24} className="text-primary" weight="duotone" />
                  </div>
                  <CardTitle className="text-3xl md:text-4xl font-semibold tracking-tight">
                    Original Agreement
                  </CardTitle>
                  <CardDescription className="text-base">
                    Please review and accept the following terms and conditions to continue.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ScrollArea className="h-[400px] rounded-md border p-6 bg-card relative">
                    <div className="space-y-4 text-base leading-relaxed">
                      <h2 className="text-xl font-semibold mb-3">Terms and Conditions</h2>
                      
                      <p>
                        This User Agreement ("Agreement") is entered into between you ("User") and our company ("Company"). 
                        By accessing or using our services, you acknowledge that you have read, understood, and agree to be 
                        bound by the terms and conditions outlined herein.
                      </p>

                      <h3 className="text-lg font-semibold mt-6 mb-2">1. Acceptance of Terms</h3>
                      <p>
                        By creating an account or using our services, you expressly acknowledge and agree to comply with all 
                        terms, conditions, and notices contained or referenced herein. If you do not agree to these terms, 
                        you must immediately cease all use of our services.
                      </p>

                      <h3 className="text-lg font-semibold mt-6 mb-2">2. User Obligations</h3>
                      <p>
                        You agree to use the services only for lawful purposes and in accordance with this Agreement. You are 
                        responsible for maintaining the confidentiality of your account credentials and for all activities that 
                        occur under your account. You must immediately notify us of any unauthorized access or security breach.
                      </p>

                      <h3 className="text-lg font-semibold mt-6 mb-2">3. Intellectual Property Rights</h3>
                      <p>
                        All content, features, and functionality of our services, including but not limited to text, graphics, 
                        logos, images, and software, are the exclusive property of the Company and are protected by international 
                        copyright, trademark, patent, trade secret, and other intellectual property laws.
                      </p>

                      <h3 className="text-lg font-semibold mt-6 mb-2">4. Limitation of Liability</h3>
                      <p>
                        To the maximum extent permitted by applicable law, the Company shall not be liable for any indirect, 
                        incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether 
                        incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
                      </p>

                      <h3 className="text-lg font-semibold mt-6 mb-2">5. Modifications to Agreement</h3>
                      <p>
                        We reserve the right to modify or replace these terms at any time at our sole discretion. If a revision 
                        is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes 
                        a material change will be determined at our sole discretion.
                      </p>

                      <h3 className="text-lg font-semibold mt-6 mb-2">6. Governing Law</h3>
                      <p>
                        This Agreement shall be governed by and construed in accordance with the laws of the jurisdiction in which 
                        the Company is registered, without regard to its conflict of law provisions. Any disputes arising from this 
                        Agreement shall be resolved through binding arbitration.
                      </p>
                    </div>
                  </ScrollArea>

                  <div className="flex items-start space-x-3 p-4 bg-secondary/50 rounded-lg">
                    <Checkbox
                      id="accept1"
                      checked={accepted1}
                      onCheckedChange={(checked) => setAccepted1(checked === true)}
                      className="mt-1"
                    />
                    <label
                      htmlFor="accept1"
                      className="text-sm leading-relaxed cursor-pointer font-ui"
                    >
                      I have read and agree to the terms and conditions outlined in the Original Agreement
                    </label>
                  </div>

                  <Button
                    onClick={handleContinue1}
                    disabled={!accepted1}
                    className="w-full font-ui text-base tracking-wide font-semibold"
                    size="lg"
                  >
                    Continue
                    <ArrowRight className="ml-2" weight="bold" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 'agreement2' && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-lg">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="font-ui text-sm">
                      Step 2 of 3
                    </Badge>
                    <FileText size={24} className="text-primary" weight="duotone" />
                  </div>
                  <CardTitle className="text-3xl md:text-4xl font-semibold tracking-tight">
                    Our Agreement
                  </CardTitle>
                  <CardDescription className="text-base">
                    One more agreement to review before we finalize everything.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ScrollArea className="h-[400px] rounded-md border p-6 bg-card relative">
                    <div className="space-y-4 text-base leading-relaxed">
                      <h2 className="text-xl font-semibold mb-3">Additional Terms of Service</h2>
                      
                      <p>
                        This supplementary agreement ("Our Agreement") establishes additional terms and conditions that govern 
                        your relationship with us. By proceeding, you acknowledge and accept these provisions in addition to 
                        the Original Agreement.
                      </p>

                      <h3 className="text-lg font-semibold mt-6 mb-2">1. Data Collection and Privacy</h3>
                      <p>
                        We collect, process, and store certain information about you and your use of our services. This includes 
                        personal information you provide directly, usage data collected automatically, and information from third-party 
                        sources. You consent to our collection and use of this information as described in our Privacy Policy.
                      </p>

                      <h3 className="text-lg font-semibold mt-6 mb-2">2. Communication Preferences</h3>
                      <p>
                        By accepting this agreement, you consent to receive communications from us via email, SMS, push notifications, 
                        or other electronic means. These communications may include service updates, promotional materials, and 
                        important notices. You may opt out of promotional communications at any time.
                      </p>

                      <h3 className="text-lg font-semibold mt-6 mb-2">3. Account Termination</h3>
                      <p>
                        We reserve the right to suspend or terminate your account at any time, with or without notice, for any reason, 
                        including but not limited to violation of these terms, suspicious activity, or extended periods of inactivity. 
                        You may also terminate your account at any time through your account settings.
                      </p>

                      <h3 className="text-lg font-semibold mt-6 mb-2">4. Third-Party Services</h3>
                      <p>
                        Our services may integrate with or contain links to third-party websites, applications, or services. We are 
                        not responsible for the content, privacy policies, or practices of any third-party services. Your use of 
                        third-party services is at your own risk and subject to their respective terms and conditions.
                      </p>

                      <h3 className="text-lg font-semibold mt-6 mb-2">5. Indemnification</h3>
                      <p>
                        You agree to indemnify, defend, and hold harmless the Company, its officers, directors, employees, and agents 
                        from and against any claims, liabilities, damages, losses, and expenses arising out of or in any way connected 
                        with your access to or use of our services, or your violation of these terms.
                      </p>

                      <h3 className="text-lg font-semibold mt-6 mb-2">6. Entire Agreement</h3>
                      <p>
                        This Agreement, together with the Original Agreement and our Privacy Policy, constitutes the entire agreement 
                        between you and the Company regarding your use of our services and supersedes all prior and contemporaneous 
                        understandings, agreements, representations, and warranties.
                      </p>
                    </div>
                  </ScrollArea>

                  <div className="flex items-start space-x-3 p-4 bg-secondary/50 rounded-lg">
                    <Checkbox
                      id="accept2"
                      checked={accepted2}
                      onCheckedChange={(checked) => setAccepted2(checked === true)}
                      className="mt-1"
                    />
                    <label
                      htmlFor="accept2"
                      className="text-sm leading-relaxed cursor-pointer font-ui"
                    >
                      I have read and agree to the additional terms outlined in Our Agreement
                    </label>
                  </div>

                  <Button
                    onClick={handleContinue2}
                    disabled={!accepted2}
                    className="w-full font-ui text-base tracking-wide font-semibold bg-accent hover:bg-accent/90"
                    size="lg"
                  >
                    Complete
                    <ArrowRight className="ml-2" weight="bold" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 'complete' && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="shadow-lg">
                <CardContent className="py-16 px-8">
                  <div className="text-center space-y-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="flex justify-center"
                    >
                      <div className="bg-accent/10 p-6 rounded-full">
                        <CheckCircle size={64} className="text-accent" weight="duotone" />
                      </div>
                    </motion.div>

                    <div className="space-y-3">
                      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
                        Thank You!
                      </h1>
                      <p className="text-lg text-muted-foreground max-w-md mx-auto">
                        You have successfully accepted all agreements. This window will close automatically.
                      </p>
                    </div>

                    <div className="pt-4">
                      <div className="inline-flex flex-col items-center gap-3">
                        <Badge variant="outline" className="font-ui text-base px-4 py-2">
                          Closing in {countdown} second{countdown !== 1 ? 's' : ''}
                        </Badge>
                        <div className="w-32 h-32 relative flex items-center justify-center">
                          <svg className="transform -rotate-90 w-32 h-32">
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="transparent"
                              className="text-secondary"
                            />
                            <motion.circle
                              cx="64"
                              cy="64"
                              r="56"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="transparent"
                              strokeLinecap="round"
                              className="text-accent"
                              initial={{ strokeDasharray: '351.86', strokeDashoffset: '0' }}
                              animate={{ strokeDashoffset: `${351.86 * (countdown / 5)}` }}
                              transition={{ duration: 1, ease: 'linear' }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-5xl font-semibold text-accent font-ui">
                              {countdown}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App