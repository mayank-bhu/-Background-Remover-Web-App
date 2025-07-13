const imageInput = document.getElementById('image-input');
const originalImage = document.getElementById('original-image');
const processedImage = document.getElementById('processed-image');
const removeBgBtn = document.getElementById('remove-bg-btn');
const downloadBtn = document.getElementById('download-btn');

const apiKey = '541mqR5NPJFeZdbuZVPRJQLD'; // Replace with your remove.bg API key

imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            originalImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

const skeleton = document.getElementById('skeleton');

removeBgBtn.addEventListener('click', () => {
    if (!imageInput.files[0]) {
        alert('Please upload an image first.');
        return;
    }

    skeleton.style.display = 'block';
    processedImage.style.display = 'none';

    const formData = new FormData();
    formData.append('image_file', imageInput.files[0]);
    formData.append('size', 'auto');

    fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            'X-Api-Key': apiKey,
        },
        body: formData,
    })
    .then(response => response.blob())
    .then(blob => {
        const url = URL.createObjectURL(blob);
        processedImage.src = url;
        downloadBtn.href = url;
        skeleton.style.display = 'none';
        processedImage.style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while removing the background.');
    });
});
