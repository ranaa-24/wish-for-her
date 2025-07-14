import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Music, Volume2 } from "lucide-react"
import her from "./assets/her.jpg";
import song from "./assets/songg.mp3"


type Stage =
  | "music-prompt"
  | "slideshow"
  | "whatsapp-intro"
  | "whatsapp"
  | "emoji"
  | "so-text"
  | "balloons"
  | "ice-cream"
  | "flower-gift"
  | "final-message"
  | "signature"

export default function BirthdayPage() {
  const [stage, setStage] = useState<Stage>("music-prompt")
  const [musicEnabled, setMusicEnabled] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [showOverlay, setShowOverlay] = useState(false)
  const [overlayStep, setOverlayStep] = useState(0)
  const [iceCreamResponse, setIceCreamResponse] = useState(false)

  const slides = ["Hiie", "It's your birthday ✨"]
  const overlayMessages = [
    "That's what I was going to do...",
    "Then I stopped.",
    "I realized I want to do something special.",
  ]

  const handleMusicChoice = (choice: boolean) => {
    setMusicEnabled(choice)
    setStage("slideshow")
  }

  useEffect(() => {
    if (stage === "slideshow") {
      const currentText = slides[currentSlide]
      const readingTime = Math.max(2500, currentText.length * 120) // Minimum 2.5s, 120ms per character

      const timer = setTimeout(() => {
        if (currentSlide < slides.length - 1) {
          setCurrentSlide(currentSlide + 1)
        } else {
          setTimeout(() => setStage("whatsapp-intro"), 1500)
        }
      }, readingTime)
      return () => clearTimeout(timer)
    }
  }, [stage, currentSlide, slides.length])

  useEffect(() => {
    if (stage === "whatsapp") {
      const message = "Happy Birthday! :)"
      let index = 0
      const timer = setInterval(() => {
        if (index <= message.length) {
          setTypedText(message.slice(0, index))
          index++
        } else {
          clearInterval(timer)
          setTimeout(() => {
            setShowOverlay(true)
          }, 1500)
        }
      }, 150) 
      return () => clearInterval(timer)
    }
  }, [stage])

  useEffect(() => {
    if (showOverlay && overlayStep < overlayMessages.length) {
      const timer = setTimeout(() => {
        setOverlayStep(overlayStep + 1)
      }, 2500) 
      return () => clearTimeout(timer)
    } else if (showOverlay && overlayStep >= overlayMessages.length) {
      setTimeout(() => setStage("emoji"), 1500)
    }
  }, [showOverlay, overlayStep, overlayMessages.length])

  const handleIceCreamChoice = (choice: boolean) => {
    setIceCreamResponse(choice)
    if (choice) {
      setTimeout(() => setStage("flower-gift"), 4000)
    } else {
      setTimeout(() => setStage("flower-gift"), 1500)
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: 0.8, ease: "easeOut" as const },
  }

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.6, ease: "easeOut" as const},
  }

  return (
    <div className="min-h-screen max-w-full mx-auto bg-gradient-to-br from-pink-50 via-purple-25 to-rose-50 relative overflow-hidden">
      {musicEnabled && (
        <audio autoPlay loop className="hidden">
          <source src={song} type="audio/mpeg" />
        </audio>
      )}

      <AnimatePresence mode="wait">
        {stage === "music-prompt" && (
          <motion.div
            key="music-prompt"
            {...fadeInUp}
            className="flex flex-col items-center justify-center min-h-screen p-6 text-center"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-pink-100">
              <Music className="w-12 h-12 text-pink-400 mx-auto mb-6" />
              <h2 className="text-xl font-medium text-pink-600 mb-8 leading-relaxed">
                Wanna play some background music?
              </h2>
              <div className="flex gap-4">
                <button
                  onClick={() => handleMusicChoice(true)}
                  className="flex-1 bg-pink-400 text-white py-3 px-6 rounded-xl font-medium hover:bg-pink-500 transition-colors duration-200"
                >
                  Yes
                </button>
                <button
                  onClick={() => handleMusicChoice(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-400 transition-colors duration-200"
                >
                  No
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {stage === "slideshow" && (
          <motion.div key="slideshow" {...fadeInUp} className="flex items-center justify-center min-h-screen p-6">
            <motion.h1
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl font-medium text-pink-600 text-center"
            >
              {slides[currentSlide]}
            </motion.h1>
          </motion.div>
        )}

        {stage === "whatsapp-intro" && (
          <motion.div
            key="whatsapp-intro"
            {...fadeInUp}
            className="flex items-center justify-center min-h-screen p-6 text-center"
          >
            <div>
              <div className="text-4xl mb-4">📱</div>
              <p className="text-lg text-pink-600 mb-6">Let me send you a message...</p>
              <button
                onClick={() => setStage("whatsapp")}
                className="bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors duration-200"
              >
                Open Chat
              </button>
            </div>
          </motion.div>
        )}

        {stage === "whatsapp" && (
          <motion.div key="whatsapp" {...scaleIn} className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-sm">
              <div className="bg-gray-800 rounded-2xl p-2 shadow-lg">
                <div className="bg-white rounded-xl overflow-hidden">
                  <div className="bg-green-500 text-white p-4 flex items-center gap-3">
                    <div className={`w-8 h-8 bg-cover rounded-full`}  style={{ backgroundImage: `url(${her})` }}></div>
                    <span className="font-medium">{import.meta.env.VITE_HER_NAME} 🦋</span>
                  </div>

                  <div className="p-4 h-64 bg-gray-50 flex flex-col justify-end">
                    <div className="bg-green-100 rounded-xl rounded-br-sm p-3 ml-auto max-w-xs">
                      <p className="text-gray-800">
                        {typedText}
                        {typedText.length < 18 && <span className="animate-pulse">|</span>}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {showOverlay && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-black/60 flex items-center justify-center p-6"
                >
                  <div className="text-center max-w-xs">
                    {overlayMessages.slice(0, overlayStep + 1).map((message, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.3, duration: 0.6 }}
                        className="text-white text-lg mb-4 leading-relaxed"
                      >
                        {message.includes("special") ? (
                          <>
                            I realized I want to do something{" "}
                            <span className="text-yellow-300 font-semibold">special</span>.
                          </>
                        ) : (
                          message
                        )}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {stage === "emoji" && (
          <motion.div
            key="emoji"
            {...fadeInUp}
            className="flex items-center justify-center min-h-screen p-6 text-center"
          >
            <div className="space-y-6">
              <h2 className="text-2xl font-medium text-pink-600">Because</h2>
              <p className="text-xl text-purple-600">You are Special</p>
              <motion.div
                initial={{ rotate: 0, scale: 0.5 }}
                animate={{ rotate: 90, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 1 }}
                className="text-4xl"
              >
                :)
              </motion.div>
              <button
                onClick={() => setStage("so-text")}
                className="bg-pink-400 text-white py-3 px-6 rounded-xl hover:bg-pink-500 transition-colors duration-200"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {stage === "so-text" && (
          <motion.div
            key="so-text"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center justify-center min-h-screen p-6"
            onAnimationComplete={() => {
              setTimeout(() => setStage("balloons"), 2000)
            }}
          >
            <motion.h1
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="text-5xl font-bold text-pink-600"
            >
              SO!
            </motion.h1>
          </motion.div>
        )}

        {stage === "balloons" && (
          <motion.div
            key="balloons"
            {...fadeInUp}
            className="flex items-center justify-center min-h-screen p-6 text-center relative"
          >
            <div className="space-y-8 flex flex-col justify-center items-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-2xl font-medium text-pink-600"
              >
                Happy Birthday!
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative inline-block"
              >
                <div className="w-24 h-24 bg-cover bg-center rounded-full flex items-center justify-center text-2xl"  style={{ backgroundImage: `url(${her})` }}>
                  
                </div>
                <div className="absolute top-3 right-6 text-xl">🎀</div>
              </motion.div>

              <button
                onClick={() => setStage("ice-cream")}
                className="bg-pink-400 text-white py-3 px-8 rounded-xl hover:bg-pink-500 transition-colors duration-200"
              >
                Continue
              </button>
            </div>

            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: "100vh", opacity: 0 }}
                animate={{ y: "-100px", opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 4,
                  delay: i * 0.5,
                  ease: "easeOut",
                }}
                className="absolute text-2xl"
                style={{
                  left: `${20 + i * 20}%`,
                }}
              >
                🎈
              </motion.div>
            ))}
          </motion.div>
        )}

        {stage === "ice-cream" && (
          <motion.div
            key="ice-cream"
            {...fadeInUp}
            className="flex items-center justify-center min-h-screen p-6 text-center"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-pink-100">
              <div className="text-3xl mb-4">🍦</div>
              <h2 className="text-xl font-medium text-pink-600 mb-6 leading-relaxed">
                Wanna go out and grab some ice cream?
              </h2>

              {!iceCreamResponse ? (
                <div className="flex gap-4">
                  <button
                    onClick={() => handleIceCreamChoice(true)}
                    className="flex-1 bg-pink-400 text-white py-3 px-6 rounded-xl font-medium hover:bg-pink-500 transition-colors duration-200"
                  >
                    Yes!
                  </button>
                  <button
                    onClick={() => handleIceCreamChoice(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-400 transition-colors duration-200"
                  >
                    No :(
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-4"
                >
                  <p className="text-lg text-pink-600">Na na naaaa...</p>
                  <p className="text-base text-purple-600">You've got a cold, remember? :(</p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                  >
                    <p className="text-base text-pink-600 leading-relaxed">
                      aww, dont worry i will bring ice creams for you later, you hold this..
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {stage === "flower-gift" && (
          <motion.div
            key="flower-gift"
            {...fadeInUp}
            className="flex items-center justify-center min-h-screen p-6 text-center"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-pink-100 space-y-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-5xl"
              >
                🌹
              </motion.div>
              <button
                onClick={() => setStage("final-message")}
                className="bg-pink-400 text-white py-3 px-6 rounded-xl hover:bg-pink-500 transition-colors duration-200"
              >
                Take it
              </button>
            </div>
          </motion.div>
        )}

        {stage === "final-message" && (
          <motion.div
            key="final-message"
            {...fadeInUp}
            className="flex items-center justify-center min-h-screen p-6 text-center"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-pink-100 space-y-6">
              <p className="text-lg text-pink-600 leading-relaxed">
                This is a small gift for you. I know it's nothing special, but I've poured my heart into it.
              </p>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="flex justify-center gap-2"
              >
                <Heart className="w-4 h-4 text-pink-400 fill-current" />
              </motion.div>
              <button
                onClick={() => setStage("signature")}
                className="bg-pink-400 text-white py-3 px-6 rounded-xl hover:bg-pink-500 transition-colors duration-200"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {stage === "signature" && (
          <motion.div
            key="signature"
            {...fadeInUp}
            className="flex items-center justify-center min-h-screen p-6 text-center"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-pink-100 space-y-6">
              <p className="text-base text-purple-500 font-bold">Happy Birthday!</p>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="border-t border-pink-200 pt-4"
              >
                <p className="text-sm text-gray-600 italic">Yours truly</p>
                <p className="text-lg text-pink-600 font-medium">Mr. penguinee</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm"
        onClick={() => setMusicEnabled(p => !p)}>
          <Volume2 className="w-4 h-4 text-pink-500" />
        </motion.button>
      }
    </div>
  )
}
