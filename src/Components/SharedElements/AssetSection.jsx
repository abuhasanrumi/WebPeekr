import React from 'react'
import SectionTitle from './SectionTitle'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FaDownload } from 'react-icons/fa6'
import JSZip from 'jszip'

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

  const downloadAllAssets = async () => {
    console.log('Download All Assets clicked!')
    // alert('Button clicked! Starting download...')
    const zip = new JSZip()
    const allAssets = [...validImageUrls, ...base64Images, ...svgs]

    if (allAssets.length === 0) {
      alert('No assets found to download!')
      return
    }

    try {
      // Process each asset and add to ZIP
      for (let i = 0; i < allAssets.length; i++) {
        const asset = allAssets[i]
        console.log(`Processing asset ${i + 1}:`, asset)
        let fileName = ''
        let fileContent = null

        if (svgPattern.test(asset)) {
          // Handle SVG
          fileName = `svg-${i + 1}.svg`
          fileContent = asset
          zip.file(fileName, fileContent)
        } else if (base64Pattern.test(asset)) {
          // Handle Base64 images
          const extension =
            asset.match(/data:image\/([^;]+);base64,/)?.[1] || 'png'
          fileName = `base64-image-${i + 1}.${extension}`
          fileContent = asset.split(',')[1] // Remove data:image/...;base64, prefix
          zip.file(fileName, fileContent, { base64: true })
        } else {
          // Handle regular image URLs
          try {
            const response = await fetch(asset)
            const blob = await response.blob()
            const extension = asset.split('.').pop()?.split('?')[0] || 'jpg'
            fileName = `image-${i + 1}.${extension}`
            zip.file(fileName, blob)
          } catch (error) {
            console.warn(`Failed to fetch image ${asset}:`, error)
            // Skip this asset if it can't be fetched
            continue
          }
        }
      }

      // console.log('Generating ZIP file...')
      // Generate and download the ZIP file
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      // console.log('ZIP blob created, size:', zipBlob.size)

      const filename = `webpeeker-assets-${
        new Date().toISOString().split('T')[0]
      }.zip`

      // Use direct blob download (most reliable method)
      // console.log('Triggering direct download...')
      const url = URL.createObjectURL(zipBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()

      // Clean up after a short delay
      setTimeout(() => {
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        console.log('Download triggered successfully!')
      }, 100)
    } catch (error) {
      console.error('Error creating ZIP file:', error)
      // Fallback to individual downloads if ZIP creation fails
      for (let i = 0; i < allAssets.length; i++) {
        const asset = allAssets[i]
        if (i > 0) {
          await new Promise((resolve) => setTimeout(resolve, 500))
        }
        if (svgPattern.test(asset)) {
          downloadSvg(asset)
        } else {
          downloadImage(asset)
        }
      }
    }
  }

  return (
    <div className='assets-data'>
      {/* Download All Button */}
      {(validImageUrls?.length > 0 ||
        base64Images?.length > 0 ||
        svgs?.length > 0) && (
        <div className='mb-4'>
          <button
            onClick={downloadAllAssets}
            className='w-full bg-primary text-white py-2 px-4 rounded-md font-medium hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center gap-2'>
            <FaDownload className='text-sm' />
            Download All as ZIP (
            {[...validImageUrls, ...base64Images, ...svgs].length})
          </button>
        </div>
      )}

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
