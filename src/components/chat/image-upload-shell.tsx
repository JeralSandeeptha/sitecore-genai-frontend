import React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Trash2, ArrowRight, ChevronLeft } from "lucide-react"
import cn from "clsx"
import { Link } from "react-router-dom"

interface UploadedImage {
  id: string
  file: File
  preview: string
}

export function ImageUploadShell() {
  const [images, setImages] = useState<UploadedImage[]>([])
  const [text, setText] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    processFiles(files)
  }

  const processFiles = (files: File[]) => {
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newImage: UploadedImage = {
            id: Date.now().toString() + Math.random(),
            file,
            preview: e.target?.result as string,
          }
          setImages((prev) => [...prev, newImage])
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files || [])
    processFiles(files)
  }

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  const handleAnalyze = async () => {
    if (images.length === 0 || !text.trim()) {
      return
    }

    setIsAnalyzing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsAnalyzing(false)
    // Here you would typically send data to your backend
    console.log("Analyzing:", { images: images.map((img) => img.file.name), text })
  }

  return (
    <div className="relative bg-gradient-to-br from-[#f8f6ff] to-[#faf7ff] min-h-screen overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="top-10 right-10 absolute bg-gradient-red-purple opacity-10 blur-3xl rounded-full w-72 h-72 animate-pulse mix-blend-multiply filter" />
      <div className="bottom-10 left-10 absolute bg-gradient-red-purple opacity-10 blur-3xl rounded-full w-72 h-72 animate-pulse mix-blend-multiply filter" />

      <div className="z-10 relative">
        {/* Header */}
        <header className="top-0 sticky bg-white/40 backdrop-blur-sm border-zinc-200 border-b">
          <div className="flex justify-between items-center mx-auto px-4 py-4 max-w-5xl">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-stone-700 hover:text-stone-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Chat
            </Link>
            <h1 className="font-semibold text-stone-900 text-xl">Component Generator</h1>
            <div className="w-20" />
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto px-4 py-12 max-w-5xl">
          <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
            {/* Upload Area */}
            <div className="lg:col-span-2">
              {/* Drag Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "relative p-12 border-2 border-dashed rounded-xl text-center transition-all duration-200 cursor-pointer",
                  isDragging
                    ? "border-gradient-red-purple bg-gradient-to-br from-red-50/50 to-purple-50/50 scale-105"
                    : "border-zinc-300 bg-white hover:border-zinc-400 hover:bg-zinc-50",
                )}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  aria-label="Upload images"
                />

                <div className="flex flex-col items-center gap-3">
                  <div className="flex justify-center items-center rounded-full w-16 h-16 gradient-red-purple">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 text-lg">Drop images here</p>
                    <p className="mt-1 text-stone-600 text-sm">or click to browse</p>
                  </div>
                  <p className="mt-2 text-stone-500 text-xs">PNG, JPG, GIF up to 10MB each</p>
                </div>
              </div>

              {/* Uploaded Images */}
              {images.length > 0 && (
                <div className="mt-8">
                  <h2 className="mb-4 font-semibold text-stone-900 text-sm">
                    Uploaded Images ({images.length})
                  </h2>
                  <div className="gap-4 grid grid-cols-2 sm:grid-cols-3">
                    {images.map((image) => (
                      <div key={image.id} className="group relative">
                        <div className="relative bg-zinc-100 border border-zinc-200 rounded-lg w-full aspect-square overflow-hidden">
                          <img
                            src={image.preview || "/placeholder.svg"}
                            alt={image.file.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex justify-center items-center bg-black/0 group-hover:bg-black/40 transition-colors">
                            <button
                              onClick={() => removeImage(image.id)}
                              className="bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 p-2 rounded-full transition-opacity"
                              aria-label="Remove image"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                        <p className="mt-2 text-stone-600 text-xs truncate">{image.file.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Text Input */}
              <div className="mt-8">
                <label htmlFor="analysis-text" className="block mb-3 font-semibold text-stone-900 text-sm">
                  What would you like to know?
                </label>
                <Textarea
                  id="analysis-text"
                  placeholder="Enter your question or instructions about the images..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="bg-white p-4 border border-zinc-200 focus:border-transparent rounded-lg focus:ring-[#E63946] focus:ring-2 min-h-32 text-stone-900 resize-none placeholder-stone-400"
                />
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-1">
              <div className="top-24 sticky bg-white shadow-sm p-6 border border-zinc-200 rounded-xl">
                <h3 className="mb-4 font-semibold text-stone-900">Summary</h3>

                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-stone-600 text-xs uppercase tracking-wider">Images</p>
                    <p className="mt-1 font-bold text-2xl gradient-red-purple-text">{images.length}</p>
                  </div>

                  <div>
                    <p className="font-medium text-stone-600 text-xs uppercase tracking-wider">Text Length</p>
                    <p className="mt-1 font-bold text-2xl gradient-red-purple-text">{text.length}</p>
                  </div>

                  <div className="pt-4 border-zinc-200 border-t">
                    <Button
                      onClick={handleAnalyze}
                      disabled={images.length === 0 || !text.trim() || isAnalyzing}
                      className={cn(
                        "w-full font-semibold transition-all",
                        images.length > 0 && text.trim() && !isAnalyzing
                          ? "gradient-red-purple text-white hover:shadow-lg hover:scale-105"
                          : "bg-zinc-200 text-stone-600 cursor-not-allowed",
                      )}
                    >
                      {isAnalyzing ? (
                        <>
                          <span className="inline-block mr-2 animate-spin">⚙️</span>
                          Generating...
                        </>
                      ) : (
                        <>
                          Generate Component
                          <ArrowRight className="inline ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
