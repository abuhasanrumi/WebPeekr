import React from 'react'
import SectionTitle from './SectionTitle'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FaDownload } from 'react-icons/fa6'

const AssetSection = ({ images, isLoading }) => {
  const validImageFormats = /\.(gif|jpg|jpeg|png|bmp|webp)$/i // List of valid image formats
  const base64Pattern = /^data:image\/(gif|jpg|jpeg|png|svg|bmp|webp);base64,/ // Pattern for Base64 images
  const svgPattern = /^<svg[\s\S]*<\/svg>$/ // Pattern to match SVG strings

  const categorizeImages = (urls) => {
    const processedImages = {
      validImageUrls: new Set(),
      base64Images: new Set(),
      svgs: new Set()
    }

    urls.forEach((url) => {
      const cleanUrl = url.split('?')[0]

      if (validImageFormats.test(cleanUrl)) {
        processedImages.validImageUrls.add(cleanUrl)
      } else if (base64Pattern.test(cleanUrl)) {
        processedImages.base64Images.add(cleanUrl)
      } else if (svgPattern.test(cleanUrl)) {
        processedImages.svgs.add(cleanUrl)
      }
    })

    return {
      validImageUrls: Array.from(processedImages.validImageUrls),
      base64Images: Array.from(processedImages.base64Images),
      svgs: Array.from(processedImages.svgs)
    }
  }

  const { validImageUrls, base64Images, svgs } = categorizeImages(images)

  const downloadImage = (url) => {
    const a = document.createElement('a')
    a.href = url
    a.download = url.split('/').pop() // Set the filename as the last segment of the URL
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const downloadSvg = (svg) => {
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'image.svg' // Default filename for SVGs
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url) // Clean up
  }

  return (
    <div className='assets-data'>
      {/* Render valid image URLs */}
      {validImageUrls?.length > 0 && (
        <>
          <SectionTitle title='Images' />
          <div className='colors-list grid grid-cols-3 gap-2 mt-2'>
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className='single-asset h-[80px] border border-[#dfdfdf] flex items-center justify-center rounded-md'>
                    <Skeleton height={80} width={80} />
                  </div>
                ))
              : validImageUrls.map((img, index) => (
                  <div
                    key={index}
                    className='relative single-asset h-[80px] border border-[#dfdfdf] flex items-center justify-center rounded-md cursor-pointer group'
                    onClick={() => downloadImage(img)} // Download on click
                  >
                    <img
                      className='object-cover h-full w-full rounded-md'
                      src={img}
                      alt='image'
                    />
                    <div className='absolute inset-0 flex items-center justify-center bg-primary bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      <FaDownload className='text-white text-2xl' />
                    </div>
                  </div>
                ))}
          </div>
        </>
      )}

      {/* Render Base64's */}
      {base64Images?.length > 0 && (
        <>
          <SectionTitle title='Base64 Images' />
          <div className='colors-list grid grid-cols-3 gap-2 mt-2'>
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className='single-asset h-[80px] border border-[#dfdfdf] flex items-center justify-center rounded-md'>
                    <Skeleton height={80} width={80} />
                  </div>
                ))
              : base64Images.map((img, index) => (
                  <div
                    key={index}
                    className='relative single-asset h-[80px] border border-[#dfdfdf] flex items-center justify-center rounded-md cursor-pointer group'
                    onClick={() => downloadImage(img)} // Download on click
                  >
                    <img
                      className='object-cover h-full w-full rounded-md'
                      src={img}
                      alt='Base64 image'
                    />
                    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      <FaDownload className='text-white text-2xl' />
                    </div>
                  </div>
                ))}
          </div>
        </>
      )}

      {/* Render SVGs */}
      {svgs?.length > 0 && (
        <>
          <SectionTitle title='SVG Images' />
          <div className='colors-list grid grid-cols-3 gap-2 mt-2'>
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className='single-asset h-[80px] border border-[#dfdfdf] flex items-center justify-center rounded-md'>
                    <Skeleton height={80} width={80} />
                  </div>
                ))
              : svgs.map((svg, index) => (
                  <div
                    key={index}
                    className='relative single-asset h-[80px] border border-[#dfdfdf] flex items-center justify-center rounded-md cursor-pointer group'
                    onClick={() => downloadSvg(svg)} // Download SVG on click
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: svg }}
                      className='h-full w-full flex items-center justify-center asset-svg group-hover:opacity-0 transition-opacity duration-100' // Add group-hover:opacity-0 to hide SVG on hover
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        height: 'auto'
                      }}
                    />
                    <div className='absolute inset-0 flex items-center justify-center bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-100'>
                      <FaDownload className='text-white text-2xl' />
                    </div>
                  </div>
                ))}
          </div>
        </>
      )}
    </div>
  )
}

export default AssetSection
