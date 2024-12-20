import { addNotification, updateCounters } from './notification.js';

document.addEventListener('DOMContentLoaded', updateCounters);

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAulOUDi39BQc6DvYulOKqHymlLHjv8Bmo",
    authDomain: "alostaz222-9a139.firebaseapp.com",
    databaseURL: "https://alostaz222-9a139-default-rtdb.firebaseio.com",
    projectId: "alostaz222-9a139",
    storageBucket: "alostaz222-9a139.appspot.com",
    messagingSenderId: "226577240230",
    appId: "1:226577240230:web:dfd5f82810e32fc36a2467",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

const signupBtn = document.getElementById('sign-up');
const signInBtn = document.getElementById('sign-in');

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    const re = /^\+?[1-9]\d{1,14}$/;
    return re.test(String(phone));
}

// Initialize the intl-tel-input plugin
const phoneInputField = document.querySelector("#phone");
const phoneInputField2 = document.querySelector("#phone2");
const phoneInput = window.intlTelInput(phoneInputField, {
    initialCountry: "eg",
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
});

// Set the input placeholder to show the selected country code
phoneInputField.addEventListener('focus', () =>{
    phoneInputField.style.direction = 'ltr';
    phoneInputField.value = `+${phoneInput.getSelectedCountryData().dialCode}`;
});


const phoneInput2 = window.intlTelInput(phoneInputField2, {
    initialCountry: "eg",
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
});

// Set the input placeholder to show the selected country code
phoneInputField2.addEventListener('focus', () =>{
    phoneInputField2.style.direction = 'ltr';
    phoneInputField2.value = `+${phoneInput2.getSelectedCountryData().dialCode}`;
});


function clearErrors() {
    document.querySelectorAll('.message').forEach(message => message.remove());
    updateCounters()
}

document.addEventListener('DOMContentLoaded', () => {
    updateCounters();

    // Show/Hide forms
    document.getElementById('showSignUp').addEventListener('click', () => {
        document.getElementById('signUpForm').style.display = 'flex';
        document.getElementById('signInForm').style.display = 'none';
    });

    document.getElementById('showSignIn').addEventListener('click', () => {
        document.getElementById('signUpForm').style.display = 'none';
        document.getElementById('signInForm').style.display = 'flex';
    });

    document.getElementById('switchToLogin').addEventListener('click', () => {
        document.getElementById('signUpForm').style.display = 'none';
        document.getElementById('signInForm').style.display = 'flex';
    });

    document.getElementById('switchToSignUp').addEventListener('click', () => {
        document.getElementById('signInForm').style.display = 'none';
        document.getElementById('signUpForm').style.display = 'flex';
    });
});

// Password visibility toggle
const togglePasswordIcons = document.querySelectorAll('.togglePassword');
togglePasswordIcons.forEach(icon => {
    icon.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');
        const input = document.getElementById(targetId);
        const iconElement = this.querySelector('i');
        if (input.type === "password") {
            input.type = "text";
            iconElement.textContent = "visibility";
        } else {
            input.type = "password";
            iconElement.textContent = "visibility_off";
        }
    });
});

signupBtn.addEventListener('click', (event) => {
    event.preventDefault();
    clearErrors();
    const SInputs = document.getElementsByClassName('SInput');
    const username = document.getElementById('username').value.trim();
    const stage = document.getElementById('stage').value;
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const phone2 = document.getElementById('phone2').value.trim();
    const password1 = document.getElementById('password1').value.trim();
    const password2 = document.getElementById('password2').value.trim();

    let hasError = false;

    if (!username || !email || !phone || !phone2 || phone == phone2 || !password1 || !password2 || stage == 'stage') {
        if (!username) {
            addNotification('error', 'اسم المستخدم مطلوب.', '.popupContainer');
            setTimeout(clearErrors, 3000);
        }
        if (stage == 'stage') {
            addNotification('error', 'صفك الدراسي مطلوب.', '.popupContainer');
            setTimeout(clearErrors, 3000);
        }
        if (!email) {
            addNotification('error', 'بريدك الالكتروني مطلوب.', '.popupContainer');
            setTimeout(clearErrors, 3000);
        }
        if (!phone) {
            addNotification('error', 'هاتفك مطلوب.', '.popupContainer');
            setTimeout(clearErrors, 3000);
        }
        if (!phone2) {
            addNotification('error', "هاتف والدك مطلوب.", '.popupContainer');
            setTimeout(clearErrors, 3000);
        }
        if (phone == phone2) {
            addNotification('error', "هاتف والدك لا يمكن ان يطابق هاتفك", '.popupContainer')
        }
        if (!password1) {
            addNotification('error', 'كلمة المرور مطلوبة.', '.popupContainer');
            setTimeout(clearErrors, 3000);
        }
        if (!password2) {
            addNotification('error', 'تأكيد كلمة المرور مطلوب.', '.popupContainer');
            setTimeout(clearErrors, 3000);
        }
        hasError = true;
    }

    if (!validateEmail(email)) {
        addNotification('error', 'برجاء ادخال بريد الكتروني صالح.', '.popupContainer');
        setTimeout(clearErrors, 3000);
        hasError = true;
    }

    if (!validatePhone(phone)) {
        addNotification('error', 'برجاء ادخال رقم هاتف صالح.', '.popupContainer');
        setTimeout(clearErrors, 3000);
        hasError = true;
    }

    if (password1 !== password2) {
        addNotification('error', 'كلمة السر وتأكيدها يجب ان يكونا متتطابقان.', '.popupContainer');
        setTimeout(clearErrors, 3000);
        hasError = true;
    }

    if (password1.length < 6) { // Minimum password length validation
    addNotification('error', 'كلمة المرور يجب الّا تقل عن ستة احرف.', '.popupContainer');
        setTimeout(clearErrors, 3000);
        hasError = true;
    }

    if (hasError) return;

    const fullPhoneNumber = phoneInput.getNumber();
    const fullPhoneNumber2 = phoneInput2.getNumber();

    // Check if username already exists
    database.ref(`users/${username}`).once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                addNotification('error', 'اسم المستخدم موجود بالفعل، قم بتجربة اسم اخر.', '.popupContainer');
                setTimeout(clearErrors, 3000);
            } else {
                // Create user
                firebase.auth().createUserWithEmailAndPassword(email, password1)
                    .then((userCredential) => {
                        const user = userCredential.user;

                        const userData = {
                            userId: user.uid,
                            username: username,
                            stage: stage,
                            email: email,
                            student_phone: fullPhoneNumber,
                            father_phone: fullPhoneNumber2,
                            'G-coupon': null,
                            'U-coupon': null
                        };

                        database.ref(`users/${username}`).set(userData)
                            .then(() => {
                                console.log('User data added to database');
                                localStorage.setItem('userData', JSON.stringify(userData));
                                addNotification('success', 'تم اضافة بيانات المستخدم لقاعدة البينات بنجاح.', '.popupContainer');
                                setTimeout(clearErrors, 3000);
                                for (let i = 0; i < SInputs.length; i++) {
                                    SInputs[i].value = '';
                                }

                                // Redirection
                                setTimeout(window.location.href = 'account', 10000);
                            })
                            .catch((error) => {
                                console.error('Database error:', error);
                                addNotification('error', 'خطأ في قاعدة البينات، جرب مرة أخرى.', '.popupContainer');
                                setTimeout(clearErrors, 3000);
                            });

                    })
                    .catch((error) => {
                        console.error('Signup error:', error);
                        if (error.code === 'auth/email-already-in-use') {
                            addNotification('error', 'البريد الالكتروني مستخدم، قم باستخدام بريد اخر.', '.popupContainer');
                            setTimeout(clearErrors, 3000);
                        } else {
                            addNotification('error', 'خطأ اثناء انشاء الحساب.', '.popupContainer');
                            setTimeout(clearErrors, 3000);
                        }
                    });
            }
        })
        .catch((error) => {
            console.error('Error checking username:', error);
            addNotification('error', 'خطأ في فحص اسم المستخدم.', '.popupContainer');
            setTimeout(clearErrors, 3000);
        });
});

signInBtn.addEventListener('click', (event) => {
    event.preventDefault();
    clearErrors();
    const authenticator = document.getElementById('authenticator').value.trim();
    const password = document.getElementById('password').value.trim();
    const LInputs = document.getElementsByClassName('LInput');

    let hasError = false;

    if (!authenticator || !password) {
        if (!authenticator) {
            addNotification('error', 'اسم المستخدم او البريد الالكتروني مطلوب.', '.popupContainer');
            setTimeout(clearErrors, 3000);
        };
        if (!password) {
            addNotification('error', 'كلمة المرور مطلوبة.', '.popupContainer');
            setTimeout(clearErrors, 3000);
        };
        hasError = true;
    }

    if (hasError) return;

    // Determine if authenticator is an email or username
    if (validateEmail(authenticator)) {
        firebase.auth().signInWithEmailAndPassword(authenticator, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // Fetch user data from the database
                database.ref(`users/${authenticator}`).once('value')
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            const userData = snapshot.val();
                            const fullUserData = {
                                uid: user.uid,
                                email: user.email,
                                username: userData.username,
                                stage: userData.stage,
                                student_phone: userData.student_phone,
                                father_phone: userData.father_phone,
                                'G-coupon': userData['G-coupon'] ?? null,
                                'U-coupon': userData['U-coupon'] ?? null
                            };

                            // Store the full user data in localStorage
                            localStorage.setItem('userData', JSON.stringify(fullUserData));
                            addNotification('success', 'تم تسجيل الدخول بنجاح.', '.popupContainer');
                            setTimeout(clearErrors, 3000);

                            for (let i = 0; i < LInputs.length; i++) {
                                LInputs[i].value = '';
                            }

                            // Redirection
                            setTimeout(window.location.href = 'account', 10000);
                        } else {
                            addNotification('error', 'بيانات المستخدم غير موجودة في قاعدة البيانات.', '.popupContainer');
                            setTimeout(clearErrors, 3000);
                        }
                    })
                    .catch((error) => {
                        console.error('Database error:', error);
                        addNotification('error', 'خطأ في قاعدة اليانات.', '.popupContainer');
                        setTimeout(clearErrors, 3000);
                    });
            })
            .catch((error) => {
                console.error('Signin error:', error);
                addNotification('error', 'خطأ في تسجيل الدخول.', '.popupContainer');
                setTimeout(clearErrors, 3000);
            });
    } else {
        // Assume authenticator is a username
        database.ref(`users/${authenticator}`).once('value')
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    const email = userData.email;
                    firebase.auth().signInWithEmailAndPassword(email, password)
                        .then((userCredential) => {
                            const user = userCredential.user;

                            const fullUserData = {
                                uid: user.uid,
                                email: user.email,
                                username: userData.username,
                                stage: userData.stage,
                                student_phone: userData.student_phone,
                                father_phone: userData.father_phone,
                                'G-coupon': userData['G-coupon'] ?? null,
                                'U-coupon': userData['U-coupon'] ?? null
                            };

                            // Store the full user data in localStorage
                            localStorage.setItem('userData', JSON.stringify(fullUserData));
                            addNotification('success', 'تم تسجيل الدخول بنجاح.', '.popupContainer');
                            setTimeout(clearErrors, 3000);

                            for (let i = 0; i < LInputs.length; i++) {
                                LInputs[i].value = '';
                            }

                            // Redirection
                            setTimeout(window.location.href = 'account', 10000);
                        })
                        .catch((error) => {
                            console.error('Signin error:', error);
                            addNotification('error', 'خطأ في تسجيل الدخول.', '.popupContainer');
                            setTimeout(clearErrors, 3000);
                        });
                } else {
                    addNotification('error', 'اسم المستخدم او البريد الالكتروني غير صالح.', '.popupContainer');
                    setTimeout(clearErrors, 3000);
                }
            })
            .catch((error) => {
                console.error('Error checking username:', error);
                addNotification('error', 'خطأ في فحص اسم المستخدم.', '.popupContainer');
                setTimeout(clearErrors, 3000);
            });
    }
});


let showSignUp = document.getElementById('showSignUp');
let showSignIn = document.getElementById('showSignIn');
let signUpForm = document.getElementById('signUpForm');
let signInForm = document.getElementById('signInForm');
let welcome = document.getElementById('welcome');
let container = document.getElementById('container');
let authContainer = document.getElementById('authContainer');
let switchToLogin = document.getElementById('switchToLogin');
let switchToSignUp = document.getElementById('switchToSignUp');

showSignUp.addEventListener('click', () => {
    signUpForm.style.display = 'flex';
    signInForm.style.display = 'none';
    welcome.style.display = 'none';
    container.style.display = 'none';
    authContainer.style.cssText = `
        background-color: transparent;
        box-shadow: none;
    `;
});

showSignIn.addEventListener('click', () => {
    signInForm.style.display = 'flex';
    signUpForm.style.display = 'none';
    welcome.style.display = 'none';
    container.style.display = 'none';
    authContainer.style.cssText = `
        background-color: transparent;
        box-shadow: none;
    `;
});

switchToLogin.addEventListener('click', () => {
    signInForm.style.display = 'flex';
    signUpForm.style.display = 'none';
});

switchToSignUp.addEventListener('click', () => {
    signUpForm.style.display = 'flex';
    signInForm.style.display = 'none';
});


document.addEventListener('DOMContentLoaded', updateCounters);

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // Dispatch an event if you want other parts of your app to know about the change
        window.dispatchEvent(new Event('storage'));
    } else {
        // Remove the user data from localStorage when the user signs out
        localStorage.removeItem('userData');
        window.dispatchEvent(new Event('storage'));
        console.log('No user is signed in.');
    }
});