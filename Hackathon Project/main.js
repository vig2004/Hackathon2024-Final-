
const nav = document.querySelector('.nav ul');
const toggleMenu = () => {
    nav.classList.toggle('show');
};

document.querySelector('.logo').addEventListener('click', toggleMenu);


document.addEventListener("DOMContentLoaded", () => {
    
    const heroTitle = document.querySelector(".hero-title");
    const heroSubtitle = document.querySelector(".hero-subtitle");
    const heroButton = document.querySelector(".hero-button");
    const heroImage = document.querySelector(".hero-image");

    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        
        const titleTop = heroTitle.getBoundingClientRect().top;
        if (titleTop < windowHeight - revealPoint) {
            heroTitle.classList.add("active");
        }

        
        const subtitleTop = heroSubtitle.getBoundingClientRect().top;
        if (subtitleTop < windowHeight - revealPoint) {
            heroSubtitle.classList.add("active");
        }

       
        const buttonTop = heroButton.getBoundingClientRect().top;
        if (buttonTop < windowHeight - revealPoint) {
            heroButton.classList.add("active");
        }

        
        const imageTop = heroImage.getBoundingClientRect().top;
        if (imageTop < windowHeight - revealPoint) {
            heroImage.classList.add("active");
        }
    };

    
    window.addEventListener("scroll", revealOnScroll);

    
    heroTitle.addEventListener("mouseenter", () => {
        heroTitle.classList.add("hovered");
    });
    heroTitle.addEventListener("mouseleave", () => {
        heroTitle.classList.remove("hovered");
    });

    heroButton.addEventListener("mouseenter", () => {
        heroButton.classList.add("hovered");
    });
    heroButton.addEventListener("mouseleave", () => {
        heroButton.classList.remove("hovered");
    });
});


document.addEventListener("DOMContentLoaded", () => {
    
    const featureCards = document.querySelectorAll(".feature-card");

    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        featureCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < windowHeight - revealPoint) {
                card.style.animation = `fadeInUp 0.6s ease-out forwards ${index * 0.2}s`;
            }
        });
    };

    
    window.addEventListener("scroll", revealOnScroll);
});


document.addEventListener("DOMContentLoaded", () => {
    
    const stepCards = document.querySelectorAll(".step-card");

    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        stepCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < windowHeight - revealPoint) {
                card.style.animation = `fadeInUp 0.6s ease-out forwards ${index * 0.2}s`;
            }
        });
    };

    
    window.addEventListener("scroll", revealOnScroll);
});

document.addEventListener("DOMContentLoaded", () => {
    const testimonials = document.querySelectorAll(".testimonial-card");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    let currentIndex = 0;

    
    testimonials[currentIndex].classList.add("active");

   
    const showTestimonial = (index) => {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove("active");
            if (i === index) {
                testimonial.classList.add("active");
            }
        });
    };

    
    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    });

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const faqCards = document.querySelectorAll(".faq-card");

    
    faqCards.forEach(card => {
        card.addEventListener("click", () => {
            
            card.classList.toggle("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");

    
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        
        alert("Message sent! We will get back to you soon.");
        contactForm.reset(); 
    });
});

        
        function getQueryParameter(name) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(name);
        }

        const userName = getQueryParameter('username'); 
        const signInButton = document.getElementById('signup_btn');

        if (userName) {
            signInButton.textContent = userName; 
            signInButton.disabled = true; 
        }
        function openChatbot() {
            window.open('chatbot.html', '_blank', 'width=400,height=500');
        }
 
        function toggleChat() {
            const chatContainer = document.getElementById("chat-container");
            chatContainer.style.display = (chatContainer.style.display === "none" || chatContainer.style.display === "") ? "flex" : "none";
        }

        function sendMessage() {
            const userInput = document.getElementById("user-input").value;
            if (userInput.trim() === "") return;

            displayMessage(userInput, "user");

            const chatBox = document.getElementById("chat-box");
            const typingIndicator = document.createElement("div");
            typingIndicator.classList.add("typing-indicator");
            typingIndicator.textContent = "Bot is typing...";
            chatBox.appendChild(typingIndicator);
            chatBox.scrollTop = chatBox.scrollHeight;

            setTimeout(() => {
                chatBox.removeChild(typingIndicator);
                let botResponse = getBotResponse(userInput);
                if (botResponse) {
                    displayMessage(botResponse, "bot");
                }
            }, 1000);

            document.getElementById("user-input").value = "";
        }

        function displayMessage(message, sender) {
            const chatBox = document.getElementById("chat-box");
            const messageElement = document.createElement("div");
            messageElement.classList.add(`${sender}-message`);
            messageElement.textContent = message;
            chatBox.appendChild(messageElement);
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        function getBotResponse(input) {
            input = input.toLowerCase();

            if (input.includes("fee receipt") || input.includes("fees") || input.includes("payment")) {
                return "For fee receipt management, please provide your transaction ID or student ID. I can help you check payment status, reissue receipts, or address any payment issues.";
            }
            if ((input.includes("lost")) && 
                (input.includes("umbrella") || input.includes("keys") || input.includes("money") || input.includes("headphones") || input.includes("earbuds") || input.includes("charger") || input.includes("powerbank"))) {
                displayMessage("We are searching for such details. Kindly wait...", "bot");
                setTimeout(() => {
                    displayMessage("Good news! We have someone reported about it. Kindly check the notifications.", "bot");
                }, 3000);
                return null;
            }
            if ((input.includes("found")) && 
        (input.includes("umbrella") || input.includes("keys") || input.includes("money") || 
         input.includes("headphones") || input.includes("earbuds") || 
         input.includes("charger") || input.includes("powerbank"))) {
        
        displayMessage("We are searching for lost items. Kindly wait...", "bot");
        setTimeout(() => {
            displayMessage("No result. Kindly make a report on the website about it.", "bot");
        }, 3000); 
        return null;
        }

            if (input.includes("transaction id") || input.includes("student id")) {
                return "Thank you! Please wait a moment while I retrieve your fee receipt information.";
            }

            
            if (input.includes("lost") || input.includes("found")) {
                return "For lost and found assistance, could you describe the item you're looking for? If you've found an item, please provide a description so we can help locate the owner.";
            }
            if (input.includes("item description") || input.includes("report")) {
                return "Thank you for providing the details! We will log this information and notify you if there are any updates and will send you personal notification.";
            }
            
            if (input.includes("hello") || input.includes("hi")) return "Hi there! How can I assist you?";
            if (input.includes("help")) return "I'm here to help! What do you need assistance with?";
            if (input.includes("bye")) return "Goodbye! It was a pleasure assisting you.";
            if (input.includes("thank you") || input.includes("thanks")) return "You're very welcome! Let me know if there’s anything else.";
            if (input.includes("hours") || input.includes("available")) return "We're available 24/7 to assist you!";
            if (input.includes("contact")) return "You can reach us at contact hiyasarma90@gmail.com or call +918638901243.";
            if (input.includes("service")) return "We offer a range of services! Could you specify which one you’re interested in?";

            return "I'm here to help! Could you please provide more details?";
        }