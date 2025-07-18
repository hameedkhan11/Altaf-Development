import React from 'react';

interface SocialLinks {
  instagram?: string;
  twitter?: string;
  github?: string;
  discord?: string;
  linkedin?: string;
  email?: string;
}

interface SocialHoverOverlayProps {
  socialLinks?: SocialLinks;
}

const SocialHoverOverlay: React.FC<SocialHoverOverlayProps> = ({ socialLinks }) => {
  // Filter out undefined links and only show available ones
  const availableLinks = Object.entries(socialLinks || {}).filter(([_, url]) => url && url !== "#");
  
  if (availableLinks.length === 0) return null;

  const handleClick = (url: string, platform: string) => {
    if (platform === 'email') {
      window.location.href = `mailto:${url}`;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,256,256" width="24px" height="24px" fillRule="nonzero">
            <g fillRule="nonzero" stroke="none" strokeWidth="1">
              <g transform="scale(8,8)">
                <path d="M11.46875,5c-3.55078,0 -6.46875,2.91406 -6.46875,6.46875v9.0625c0,3.55078 2.91406,6.46875 6.46875,6.46875h9.0625c3.55078,0 6.46875,-2.91406 6.46875,-6.46875v-9.0625c0,-3.55078 -2.91406,-6.46875 -6.46875,-6.46875zM11.46875,7h9.0625c2.47266,0 4.46875,1.99609 4.46875,4.46875v9.0625c0,2.47266 -1.99609,4.46875 -4.46875,4.46875h-9.0625c-2.47266,0 -4.46875,-1.99609 -4.46875,-4.46875v-9.0625c0,-2.47266 1.99609,-4.46875 4.46875,-4.46875zM21.90625,9.1875c-0.50391,0 -0.90625,0.40234 -0.90625,0.90625c0,0.50391 0.40234,0.90625 0.90625,0.90625c0.50391,0 0.90625,-0.40234 0.90625,-0.90625c0,-0.50391 -0.40234,-0.90625 -0.90625,-0.90625zM16,10c-3.30078,0 -6,2.69922 -6,6c0,3.30078 2.69922,6 6,6c3.30078,0 6,-2.69922 6,-6c0,-3.30078 -2.69922,-6 -6,-6zM16,12c2.22266,0 4,1.77734 4,4c0,2.22266 -1.77734,4 -4,4c-2.22266,0 -4,-1.77734 -4,-4c0,-2.22266 1.77734,-4 4,-4z" fill="#cc39a4"></path>
              </g>
            </g>
          </svg>
        );
      case 'twitter':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
            <path d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429" fill="#03A9F4"></path>
          </svg>
        );
      case 'github':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="24px" height="24px">
            <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" fill="#333"></path>
          </svg>
        );
      case 'linkedin':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
            <path d="M8.421 14h.052c0 0 0 0 0 0C9.263 14 10 13.036 10 11.95 10 10.845 9.242 10 8.526 10 7.789 10 7 10.845 7 11.95 7 13.036 7.737 14 8.421 14zM7 16H10V36H7V16zM20 16c-2.259 0-3.75 1.48-4.5 2.7V16h-3v18.7c0 .3 0 .3 0 0V36h3v-9.9c0-3.3 1.8-4.1 3-4.1s3 .8 3 4.1V36h3V25C24.5 19.8 22.259 16 20 16z" fill="#0077b5"></path>
          </svg>
        );
      case 'email':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
            <path d="M34,42H14c-4.411,0-8-3.589-8-8V14c0-4.411,3.589-8,8-8h20c4.411,0,8,3.589,8,8v20C42,38.411,38.411,42,34,42z" fill="#1e88e5"/>
            <path d="M35.926,17.488L29.414,23.999L35.926,30.511c0.523-0.424,0.856-1.068,0.856-1.788V19.277C36.782,18.557,36.449,17.913,35.926,17.488z" fill="#1565c0"/>
            <path d="M26.688,23.999l7.824-7.825C34.195,15.827,33.923,15.7,33.621,15.7H14.379c-0.302,0-0.574,0.127-0.891,0.474L26.688,23.999z" fill="#1565c0"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
      style={{
        background: 'rgba(0, 0, 0, 0.7)',
        pointerEvents: 'none'
      }}
    >
      <div className="flex flex-col gap-2" style={{ pointerEvents: 'auto' }}>
        {availableLinks.length <= 2 ? (
          <div className="flex gap-2">
            {availableLinks.slice(0, 2).map(([platform, url], index) => (
              <button
                key={platform}
                onClick={() => handleClick(url, platform)}
                className={`w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 ${
                  index === 0 ? 'hover:bg-pink-500' : 'hover:bg-blue-500'
                }`}
                style={{
                  borderRadius: index === 0 ? '48px 4px 4px 4px' : '4px 48px 4px 4px'
                }}
              >
                {getSocialIcon(platform)}
              </button>
            ))}
          </div>
        ) : (
          <>
            <div className="flex gap-2">
              {availableLinks.slice(0, 2).map(([platform, url], index) => (
                <button
                  key={platform}
                  onClick={() => handleClick(url, platform)}
                  className={`w-12 h-12 bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 ${
                    platform === 'instagram' ? 'hover:bg-pink-500' :
                    platform === 'twitter' ? 'hover:bg-blue-400' :
                    platform === 'github' ? 'hover:bg-gray-800' :
                    platform === 'linkedin' ? 'hover:bg-blue-600' :
                    'hover:bg-red-500'
                  }`}
                  style={{
                    borderRadius: index === 0 ? '48px 4px 4px 4px' : '4px 48px 4px 4px'
                  }}
                >
                  {getSocialIcon(platform)}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {availableLinks.slice(2, 4).map(([platform, url], index) => (
                <button
                  key={platform}
                  onClick={() => handleClick(url, platform)}
                  className={`w-12 h-12 bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 ${
                    platform === 'instagram' ? 'hover:bg-pink-500' :
                    platform === 'twitter' ? 'hover:bg-blue-400' :
                    platform === 'github' ? 'hover:bg-gray-800' :
                    platform === 'linkedin' ? 'hover:bg-blue-600' :
                    'hover:bg-red-500'
                  }`}
                  style={{
                    borderRadius: index === 0 ? '4px 4px 4px 48px' : '4px 4px 48px 4px'
                  }}
                >
                  {getSocialIcon(platform)}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default SocialHoverOverlay