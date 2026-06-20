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
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-[700px] h-[700px] bg-primary/40 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px]" />
      </div>
      
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              oklch(0.58 0.18 155 / 0.05) 20px,
              oklch(0.58 0.18 155 / 0.05) 40px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 20px,
              oklch(0.35 0.12 285 / 0.05) 20px,
              oklch(0.35 0.12 285 / 0.05) 40px
            )
          `
        }}
      />
      
      <div className="w-full max-w-3xl relative z-10">
        <div className="mb-8">
          <Progress value={progressValue} className="h-2 bg-muted/50 shadow-inner" />
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
              <Card className="shadow-2xl border-accent/30 backdrop-blur-sm bg-card/95 ring-1 ring-accent/20">
                <CardHeader className="space-y-4 pb-6 border-b border-border/30">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs font-medium tracking-wide uppercase px-3 py-1.5 bg-accent/20 text-accent-foreground border-accent/40">
                      Step 1 of 3
                    </Badge>
                    <div className="p-2 rounded-lg bg-accent/10 ring-1 ring-accent/30">
                      <FileText size={28} className="text-accent" weight="duotone" />
                    </div>
                  </div>
                  <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight">
                    Original Agreement
                  </CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    Please review and accept the following terms and conditions to continue.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ScrollArea className="h-[400px] rounded-lg border border-accent/30 p-6 bg-muted/40 relative shadow-inner">
                    <div className="space-y-4 text-sm leading-relaxed">
                      <h2 className="text-xl font-bold mb-3 text-foreground">MIT License</h2>
                      
                      <p className="text-muted-foreground">
                        Copyright (c) 2026 Marcin Szczygliński
                      </p>

                      <p className="text-muted-foreground">
                        GitHub: https://github.com/szczyglis-dev/py-gpt
                      </p>

                      <p className="text-muted-foreground mt-6">
                        Permission is hereby granted, free of charge, to any person obtaining a copy
                        of this software and associated documentation files (the "Software"), to deal
                        in the Software without restriction, including without limitation the rights
                        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                        copies of the Software, and to permit persons to whom the Software is
                        furnished to do so, subject to the following conditions:
                      </p>

                      <p className="text-muted-foreground mt-6">
                        The above copyright notice and this permission notice shall be included in all
                        copies or substantial portions of the Software.
                      </p>

                      <p className="text-muted-foreground mt-6">
                        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                        SOFTWARE.
                      </p>
                    </div>
                  </ScrollArea>

                  <div className="flex items-start space-x-3 p-4 bg-accent/10 rounded-lg border border-accent/30 ring-1 ring-accent/10">
                    <Checkbox
                      id="accept1"
                      checked={accepted1}
                      onCheckedChange={(checked) => setAccepted1(checked === true)}
                      className="mt-1 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                    />
                    <label
                      htmlFor="accept1"
                      className="text-sm leading-relaxed cursor-pointer text-foreground"
                    >
                      I have read and agree to the terms and conditions outlined in the Original Agreement
                    </label>
                  </div>

                  <Button
                    onClick={handleContinue1}
                    disabled={!accepted1}
                    className="w-full text-base tracking-wide font-semibold bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20"
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
              <Card className="shadow-2xl border-accent/30 backdrop-blur-sm bg-card/95 ring-1 ring-accent/20">
                <CardHeader className="space-y-4 pb-6 border-b border-border/30">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs font-medium tracking-wide uppercase px-3 py-1.5 bg-accent/20 text-accent-foreground border-accent/40">
                      Step 2 of 3
                    </Badge>
                    <div className="p-2 rounded-lg bg-accent/10 ring-1 ring-accent/30">
                      <FileText size={28} className="text-accent" weight="duotone" />
                    </div>
                  </div>
                  <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight">
                    Our Agreement
                  </CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    One more agreement to review before we finalize everything.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ScrollArea className="h-[400px] rounded-lg border border-accent/30 p-6 bg-muted/40 relative shadow-inner">
                    <div className="space-y-4 text-sm leading-relaxed">
                      <h2 className="text-xl font-bold mb-3 text-foreground">GNU General Public License - Version 3</h2>
                      
                      <p className="text-muted-foreground">
                        https://opensource.org/license/gpl-3-0
                      </p>

                      <h3 className="text-base font-bold mt-6 mb-2 text-foreground">Preamble</h3>
                      
                      <p className="text-muted-foreground">
                        The GNU General Public License is a free, copyleft license for software and other kinds of works.
                      </p>

                      <p className="text-muted-foreground mt-6">
                        The licenses for most software and other practical works are designed to take away your freedom
                        to share and change the works. By contrast, the GNU General Public License is intended to
                        guarantee your freedom to share and change all versions of a program--to make sure it remains free
                        software for all its users. We, the Free Software Foundation, use the GNU General Public License
                        for most of our software; it applies also to any other work released this way by its authors. You
                        can apply it to your programs, too.
                      </p>

                      <p className="text-muted-foreground mt-6">
                        When we speak of free software, we are referring to freedom, not price. Our General Public
                        Licenses are designed to make sure that you have the freedom to distribute copies of free software
                        (and charge for them if you wish), that you receive source code or can get it if you want it, that
                        you can change the software or use pieces of it in new free programs, and that you know you can do
                        these things.
                      </p>

                      <p className="text-muted-foreground mt-6">
                        To protect your rights, we need to prevent others from denying you these rights or asking you to
                        surrender the rights. Therefore, you have certain responsibilities if you distribute copies of the
                        software, or if you modify it: responsibilities to respect the freedom of others.
                      </p>
                    </div>
                  </ScrollArea>

                  <div className="flex items-start space-x-3 p-4 bg-accent/10 rounded-lg border border-accent/30 ring-1 ring-accent/10">
                    <Checkbox
                      id="accept2"
                      checked={accepted2}
                      onCheckedChange={(checked) => setAccepted2(checked === true)}
                      className="mt-1 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                    />
                    <label
                      htmlFor="accept2"
                      className="text-sm leading-relaxed cursor-pointer text-foreground"
                    >
                      I have read and agree to the additional terms outlined in Our Agreement
                    </label>
                  </div>

                  <Button
                    onClick={handleContinue2}
                    disabled={!accepted2}
                    className="w-full text-base tracking-wide font-semibold bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20"
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
              <Card className="shadow-2xl border-accent/30 backdrop-blur-sm bg-card/95 ring-1 ring-accent/20">
                <CardContent className="py-16 px-8">
                  <div className="text-center space-y-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="flex justify-center"
                    >
                      <div className="bg-accent/20 p-6 rounded-full border-2 border-accent/50 ring-4 ring-accent/10 shadow-lg shadow-accent/20">
                        <CheckCircle size={64} className="text-accent" weight="duotone" />
                      </div>
                    </motion.div>

                    <div className="space-y-3">
                      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Thank You!
                      </h1>
                      <p className="text-base text-muted-foreground max-w-md mx-auto">
                        You have successfully accepted all agreements. This window will close automatically.
                      </p>
                    </div>

                    <div className="pt-4">
                      <div className="inline-flex flex-col items-center gap-3">
                        <Badge variant="outline" className="text-sm px-4 py-2 border-accent/50 text-accent bg-accent/10">
                          Closing in {countdown} second{countdown !== 1 ? 's' : ''}
                        </Badge>
                        <div className="w-32 h-32 relative flex items-center justify-center">
                          <svg className="transform -rotate-90 w-32 h-32">
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              stroke="currentColor"
                              strokeWidth="6"
                              fill="transparent"
                              className="text-muted/40"
                            />
                            <motion.circle
                              cx="64"
                              cy="64"
                              r="56"
                              stroke="currentColor"
                              strokeWidth="6"
                              fill="transparent"
                              strokeLinecap="round"
                              className="text-accent"
                              initial={{ strokeDasharray: '351.86', strokeDashoffset: '0' }}
                              animate={{ strokeDashoffset: `${351.86 * (countdown / 5)}` }}
                              transition={{ duration: 1, ease: 'linear' }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-5xl font-bold text-accent">
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