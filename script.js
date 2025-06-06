document.addEventListener('DOMContentLoaded', () => {
  // --- Modal Elements ---
  const signupModal = document.getElementById("signupModal");
  const confirmModal = document.getElementById("confirmModal");
  const confirmModal2 = document.getElementById("confirmModal2");
  const confirmModal3 = document.getElementById("confirmModal3");
  const confirmModal4 = document.getElementById("confirmModal4");

  const signupBtn = document.getElementById("signupBtn");
  const confirmYesBtn = document.getElementById("confirmYesBtn");
  const confirmYesBtn2 = document.getElementById("confirmYesBtn2");
  const confirmYesBtn3 = document.getElementById("confirmYesBtn3");
  const confirmYesBtn4 = document.getElementById("confirmYesBtn4");

  // --- Disable scrolling while modal is open ---
  document.body.style.overflow = "hidden";

  // --- Sign Up button logic ---
  signupBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (username && password) {
      document.body.style.overflow = "hidden";
      signupModal.classList.add("hidden");
      confirmModal.classList.remove("hidden");
    }
  });

  // Step 1: First "Yes" → Show second modal
  confirmYesBtn.addEventListener("click", () => {
    confirmModal.classList.add("hidden");
    confirmModal2.classList.remove("hidden"); // Show second modal
    document.body.style.overflow = "hidden";
  });

  // Step 2: Second "Yes..." → Show third modal
  confirmYesBtn2.addEventListener("click", () => {
    confirmModal2.classList.add("hidden");
    confirmModal3.classList.remove("hidden"); // Show third modal
    document.body.style.overflow = "hidden";
  });

  // Step 3: Third "Yes, I'm sure!" → Close all modals
  confirmYesBtn3.addEventListener("click", () => {
    confirmModal3.classList.add("hidden");
    confirmModal4.classList.remove("hidden"); // Show fourth modal
    document.body.style.overflow = "hidden";
  });

  confirmModal4.addEventListener("click", () => {
    confirmModal4.classList.add("hidden");
    document.body.style.overflow = "auto"; // Re-enable scrolling
  });

    // --- Image Upload Elements ---
  const addPictureBtn = document.getElementById('addPictureBtn');
  const pictureInput = document.getElementById('pictureInput');
  const pictureGallery = document.getElementById('pictureGallery');
  const uploadProgressBar = document.getElementById('uploadProgressBar');

  // Key to store images in localStorage
  const STORAGE_KEY = 'uploadedPictures';

  // Load saved images from localStorage and display them
  function loadSavedImages() {
    const savedImages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    savedImages.forEach(dataUrl => {
      addImageToGallery(dataUrl);
    });
  }

  // Save the current images in the gallery to localStorage
  function saveImagesToStorage() {
    const images = pictureGallery.querySelectorAll('img.uploaded-picture');
    const dataUrls = Array.from(images).map(img => img.src);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataUrls));
  }

  // Helper to create and append image + remove button to gallery
  function addImageToGallery(dataUrl) {
    const pictureContainer = document.createElement('div');
    pictureContainer.className = 'picture-container';

    const img = document.createElement('img');
    img.src = dataUrl;
    img.className = 'uploaded-picture';

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-picture-btn';

    removeBtn.addEventListener('click', () => {
      pictureGallery.removeChild(pictureContainer);
      saveImagesToStorage();
    });

    pictureContainer.appendChild(img);
    pictureContainer.appendChild(removeBtn);
    pictureGallery.appendChild(pictureContainer);
  }

  if (addPictureBtn && pictureInput) {
    addPictureBtn.addEventListener('click', () => {
      pictureInput.click();
    });
  }

  if (pictureInput && pictureGallery && uploadProgressBar) {
    pictureInput.addEventListener('change', function () {
      const file = this.files[0];
      if (!file || !file.type.startsWith('image/')) return;

      uploadProgressBar.classList.remove('hidden');
      uploadProgressBar.style.width = '0%';

      const reader = new FileReader();

      reader.onload = function (e) {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          uploadProgressBar.style.width = progress + '%';

          if (progress >= 100) {
            clearInterval(interval);
            uploadProgressBar.classList.add('hidden');

            addImageToGallery(e.target.result);
            saveImagesToStorage();

            pictureInput.value = ''; // Reset input
          }
        }, 50);
      };

      reader.readAsDataURL(file);
    });
  }

  // Load images on page load
  loadSavedImages();

  // --- Prayers ---

  // --- Prayer Elements ---
  const generatePrayerBtn = document.getElementById('generatePrayerBtn');
  const prayerOutput = document.getElementById('prayerOutput');
  const generatePrayerBtn2 = document.getElementById('generatePrayerBtn2');
  const prayerOutput2 = document.getElementById('prayerOutput2');

const bibleverses = [
    "Philippians 4:13 - I can do all things through Christ who strengthens me.",
    "Jeremiah 29:11 - For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    "Psalm 23:1 - The Lord is my shepherd; I shall not want.",
    "Isaiah 40:31 - But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    "Romans 8:28 - And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    "Proverbs 3:5-6 - Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    "Psalm 46:1 - God is our refuge and strength, an ever-present help in trouble.",
    "Matthew 11:28 - Come to me, all you who are weary and burdened, and I will give you rest.",
    "Romans 15:13 - May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
    "Psalm 37:4 - Delight yourself in the Lord, and he will give you the desires of your heart.",
    "1 Peter 5:7 - Cast all your anxiety on him because he cares for you.",
    "Psalm 121:1-2 - I lift up my eyes to the mountains—where does my help come from? My help comes from the Lord, the Maker of heaven and earth.",
    "Ephesians 3:20 - Now to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us.",
    "2 Corinthians 5:7 - For we walk by faith, not by sight.",
    "Psalm 118:24 - This is the day that the Lord has made; let us rejoice and be glad in it.",
    "Isaiah 41:10 - So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
    "John 3:16 - For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    "Psalm 139:14 - I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.",
    "Romans 12:2 - Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God’s will is—his good, pleasing and perfect will.",
    "Philippians 4:6-7 - Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
    "Psalm 19:14 - May these words of my mouth and this meditation of my heart be pleasing in your sight, Lord, my Rock and my Redeemer.",
    "Colossians 3:23 - Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.",
    "James 1:2-3 - Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance.",
    "Psalm 34:18 - The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
    "1 Corinthians 16:14 - Do everything in love.",
    "Psalm 91:1 - Whoever dwells in the secret place of the Most High will rest in the shadow of the Almighty.",
    "Matthew 5:16 - In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.",
    "Hebrews 13:5 - Keep your lives free from the love of money and be content with what you have, because God has said, 'Never will I leave you; never will I forsake you.'",
    "Psalm 119:105 - Your word is a lamp for my feet, a light on my path.",
    "2 Timothy 1:7 - For God has not given us a spirit of fear, but of power and of love and of a sound mind.",
    "Psalm 30:5 - Weeping may stay for the night, but rejoicing comes in the morning.",
    "Isaiah 26:3 - You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
    "Romans 10:17 - Consequently, faith comes from hearing the message, and the message is heard through the word about Christ.",
  ];

  const prayersfromjhonas = [
      "Dear Lord, please bless Amber with joy, love, and endless happiness.",
      "Heavenly Father, watch over Amber and guide her steps every day.",
      "May Amber's heart be filled with peace and her life with purpose.",
      "Lord, strengthen Amber in times of struggle and fill her days with hope.",
      "Bless Amber with kindness, courage, and unwavering faith.",
      "Dear God, may Amber always feel Your presence and love surrounding her.",
      "Lord, grant Amber the wisdom to make the right choices and the strength to follow them.",
      "Heavenly Father, may Amber's life be a reflection of Your love and grace.",
      "Dear God, bless Amber with health, happiness, and the fulfillment of her dreams.",
      "Lord, may Amber find comfort in Your embrace and joy in Your creation.",
      "Heavenly Father, may Amber's life be filled with laughter, love, and cherished moments.",
      "Dear Lord, may Amber always know how much she is loved and valued.",
      "Lord, bless Amber with the courage to face challenges and the wisdom to overcome them.",
      "Heavenly Father, may Amber's heart be open to Your guidance and her spirit uplifted by Your love.",
      "Dear God, may Amber's life be a testament to Your goodness and mercy.",
      "Lord, bless Amber with the strength to pursue her passions and the grace to find joy in every moment.",
      "Father in Heaven, I pray that you heal Amber's heart and give her peace in her soul.",
      "Dear God, may Amber always find comfort in Your love and strength in Your presence.",
      "Father, I ask that you watch over Amber and her family, protect them from the harm and evil this world produces.",
      "Dear father in Heaven, I pray that Amber finds the peace that she is looking for in life with and without me.",
      "Father Jesus, I pray that Amber finds the strength to overcome any obstacles in her life.",
      "Father in Heaven, You know that I love her very much, with all my heart. And I pray that you bless her with the love and happiness that she deserves.",
      "Dear God, I ask that you protect and give peace to Amber and her family, and that you bless them with your love and grace.",
    ];

  if (generatePrayerBtn && prayerOutput) {
    generatePrayerBtn.addEventListener('click', () => {
      const randomPrayer = bibleverses[Math.floor(Math.random() * bibleverses.length)];
      prayerOutput.textContent = randomPrayer;
    });
  }

  if (generatePrayerBtn2 && prayerOutput2) {
    generatePrayerBtn2.addEventListener('click', () => {
      const randomPrayer = prayersfromjhonas[Math.floor(Math.random() * prayersfromjhonas.length)];
      prayerOutput2.textContent = randomPrayer;
    });
  }

  // --- About Slider ---
  const aboutSlides = [
    {
      img: 'images/Picture of Amber.jpg',
      text: `Amber is the most outstanding person anyone can ever meet. She is beautiful, smart, loving, and a very kind person.
      She is a great friend and an amazing person to be around. Amber has a heart of gold and always puts others before herself.
      She is truly one of a kind. A gift to everyone from God.`
    },
    {
      img: 'images/Picture of Amber 2.jpg',
      text: `Amber’s smile has the power to brighten anyone's day. She radiates joy and peace wherever she goes.
      Her presence is comforting and her laughter is contagious. She is a true treasure.`
    }
  ];

  let currentAboutIndex = 0;

  const aboutImage = document.getElementById('aboutImage');
  const aboutText = document.getElementById('aboutText');
  const prevBtn = document.getElementById('prevAboutBtn');
  const nextBtn = document.getElementById('nextAboutBtn');

  function updateAboutSlide() {
  if (aboutImage && aboutText) {
    // Start fade out
    aboutImage.classList.add('fade-out');
    aboutText.classList.add('fade-out');

    // After fade out duration (500ms), change content and fade in
    setTimeout(() => {
      aboutImage.src = aboutSlides[currentAboutIndex].img;
      aboutText.textContent = aboutSlides[currentAboutIndex].text;

      aboutImage.classList.remove('fade-out');
      aboutText.classList.remove('fade-out');

      aboutImage.classList.add('fade-in');
      aboutText.classList.add('fade-in');

      // Remove fade-in class after transition completes to keep clean state
      setTimeout(() => {
        aboutImage.classList.remove('fade-in');
        aboutText.classList.remove('fade-in');
      }, 500);
    }, 500);
  }
}

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentAboutIndex = (currentAboutIndex - 1 + aboutSlides.length) % aboutSlides.length;
      updateAboutSlide();
    });

    nextBtn.addEventListener('click', () => {
      currentAboutIndex = (currentAboutIndex + 1) % aboutSlides.length;
      updateAboutSlide();
    });
  }

  // Initialize first slide
  updateAboutSlide();
});
