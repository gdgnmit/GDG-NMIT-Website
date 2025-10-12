import React from 'react'

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Contact Section */}
      <div className="flex items-center justify-center min-h-screen px-8">
        <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Left Side - Contact Form */}
          <div className="flex-1 bg-[#4285F4] p-12 flex flex-col justify-center">
            <h2 className="text-[48px] font-bold text-white mb-12" style={{fontFamily: 'Product Sans'}}>Contact Us</h2>
            <div className="space-y-8">
              <div className="text-[20px] text-white" style={{fontFamily: 'Product Sans'}}>Name</div>
              <div className="text-[20px] text-white" style={{fontFamily: 'Product Sans'}}>Email</div>
              <div className="text-[20px] text-white" style={{fontFamily: 'Product Sans'}}>Phone</div>
              <div className="text-[20px] text-white" style={{fontFamily: 'Product Sans'}}>Message</div>
            </div>
          </div>
          
          {/* Right Side - Map */}
          <div className="flex-1 relative">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=77.595,13.005,77.606,13.016&layer=mapnik&marker=13.0103949,77.6007373"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
            ></iframe>
            <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg max-w-xs hidden md:block">
              <h3 className="font-bold text-sm text-black mb-1">Nitte Meenakshi Institute of Technology</h3>
              <p className="text-xs text-gray-600">NITTE Campus, 6429, NITTE Meenakshi College Rd, BSF Campus, Yelahanka, Bengaluru, Govindapura, Karnataka 560064</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact