document.addEventListener('DOMContentLoaded', function() {
    const umbrella = document.getElementById('umbrella');
    const logoPreview = document.getElementById('logo-preview');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const logoUpload = document.getElementById('logo-upload');
    const uploadLabel = document.getElementById('upload-label');
    const loaderIcon = document.getElementById('loader-icon');
  
    colorSwatches.forEach(swatch => {
      swatch.addEventListener('click', function() {
        const color = this.getAttribute('data-color');
        const bgColor = this.getAttribute('data-bgcolor');
        umbrella.src = `images/${color}.png`;
        document.body.style.backgroundColor = bgColor;
        
        // Set predefined darker shades for specific colors
        let darkerColor;
        switch (color) {
          case 'Pink umbrella':
            darkerColor = '#ff80bf'; // Darker shade of pink
            break;
          case 'Blue umbrella':
            darkerColor = '#001f4d'; // Darker shade of blue
            break;
          case 'Yellow umbrella':
            darkerColor = '#b28c00'; // Darker shade of yellow
            break;
          default:
            darkerColor = darkenColor(bgColor, 20); // Default darker shade calculation
            break;
        }
        
        // Change upload button color to the predefined darker shade
        uploadLabel.style.backgroundColor = darkerColor;
        
        // Reset upload button text when changing color
        uploadLabel.textContent = 'Upload Logo';
      });
    });
  
    logoUpload.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          logoPreview.src = e.target.result;
          logoPreview.style.display = 'block';
          // Update upload button text to filename
          uploadLabel.textContent = file.name;
        }
        reader.readAsDataURL(file);
      }
    });
  
    // Trigger file input click when upload label is clicked
    uploadLabel.addEventListener('click', function() {
      logoUpload.click();
    });
  
    // Function to darken a color by a percentage
    function darkenColor(color, percent) {
      // Remove '#' if present
      color = color.replace('#', '');
  
      // Convert to RGB
      const r = parseInt(color.substring(0, 2), 16);
      const g = parseInt(color.substring(2, 4), 16);
      const b = parseInt(color.substring(4, 6), 16);
  
      // Calculate darker color
      const darkerR = Math.floor(r * (100 - percent) / 100);
      const darkerG = Math.floor(g * (100 - percent) / 100);
      const darkerB = Math.floor(b * (100 - percent) / 100);
  
      // Return as hex color
      return `#${darkerR.toString(16)}${darkerG.toString(16)}${darkerB.toString(16)}`;
    }
  });
  