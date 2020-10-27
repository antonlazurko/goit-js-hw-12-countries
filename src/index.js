import './style.css';
const heading = document.createElement('h1');
const inputArea = document.createElement('input');
inputArea.type = 'text';
inputArea.placeholder = 'Write country name';
inputArea.classList.add('input_country');
//----
inputArea.addEventListener('input', updateValue);

function updateValue() {
  heading.textContent = inputArea.value;
}
//----
const root = document.querySelector('#root');
root.append(heading, inputArea);
