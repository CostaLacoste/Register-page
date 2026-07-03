// Role toggle
document.querySelector('.sign').forEach(s => {
    s.addEventListener('click', () => {
        document.querySelectorAll('.sign').forEach(o => o.classList.remove('active'));
        s.classList.add('active');
    });
});

// Password visibitity
document.querySelectorAll('.toggle-visibility').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = getElementById(btn.dataset.target);
        input.type = input.type === 'password' ? 'text' : 'password';
    });
});

// Live validation
const phone = getElementById('phone');
const phoneMsg = getElementById('phoneMsg');
phone.addEventListener('input', () => {
    const val = phone.value.trim();
    const valid = /^[0-9+\s-]{7,15}$/.test(val);
    if(val.length === 0){ phone.classList.remove('invalid'); phoneMsg.classList.remove('error'); return; }
    phone.classList.toggle('invalid', !valid);
    phoneMsg.style.display = valid ? 'none' : 'flex';
});

const pw = getElementById('password');
const cpw = getElementById('confirmPassword');
const confirmMsg = document.getElementById('confirmMsg');
function checkMatch(){
    if(cpw.value.length === 0){ cpw.classList.remove('invalid'); confirmMsg.style.display='none'; return; }
    const match = pw.value === cpw.value;
    cpw.classList.toggle('invalid', !match);
    confirmMsg.style.display = match ? 'none' : 'flex';
  }
pw.addEventListener('input', checkMatch);
cpw.addEventListener('input', checkMatch);

// Submit flow
const fullName = document.getElementById('fullName');
const terms = document.getElementById('terms');
const banner = document.getElementById('banner');
const submitBtn = document.getElementById('submitBtn');
const spinner = document.getElementById('spinner');
const submitLabel = document.getElementById('submitLabel');
const form = document.getElementById('registerForm');
const nameMsg = document.getElementById('nameMsg');
const termsMsg = document.getElementById('termsMsg');

function validatePhone(){
    const val = phone.value.trim();
    const valid = /^[0-9+\s-]{7,15}$/.test(val);
    phone.classList.toggle('invalid', !valid);
    phoneMsg.style.display = valid ? 'none' : 'flex';
    return valid;
}

function validateMatch(){
    const match = pw.value.length >= 8 && pw.value === cpw.value;
    cpw.classList.toggle('invalid', !match);
    confirmMsg.style.display = match ? 'none' : 'flex';
    return match;
}

function validateName(){
    const valid = fullName.value.trim().length > 1;
    fullName.classList.toggle('invalid', !valid);
    if(nameMsg) nameMsg.style.display = valid ? 'none' : 'flex';
    return valid;
}

function validateTerms(){
    const valid = terms.checked;
    if(termsMsg) termsMsg.style.display = valid ? 'none' : 'flex';
    return valid;
}

function setLoading(isLoading){
    submitBtn.disabled = isLoading;
    spinner.classList.toggle('show', isLoading);
    submitLabel.textContent = isLoading ? 'Creating account…' : 'Create account';
    [fullName, phone, pw, cpw].forEach(i=>i.disabled = isLoading);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    banner.classList.remove('show');
 
    const nameOk = validateName();
    const phoneOk = validatePhone();
    const matchOk = validateMatch();
    const termsOk = validateTerms();
 
    if(!nameOk || !phoneOk || !matchOk || !termsOk) return;
 
    setLoading(true);
 
    // Simulated API call — replace with the real registration request.
    setTimeout(()=>{
      setLoading(false);

      if(phone.value.replace(/\s|-/g,'') === '0701234567'){
        banner.classList.add('show');
        return;
      }
 
      submitLabel.textContent = 'Account created ✓';
      submitBtn.disabled = true;
    }, 1400);
  });