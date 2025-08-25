// messaging.js
// Simple messaging system using localStorage for demo


const MESSAGING_KEY = 'pmc_messages';
// Helper: get username (customize as needed)
function getUsername() {
  // Example: get from localStorage, or prompt, or page
  // For demo, fallback to 'User'
  return localStorage.getItem('pmc_username') || 'User';
}

function getRole() {
  // Try to infer role from URL or page (customize as needed)
  if (window.location.href.includes('as=hod')) return 'HOD';
  if (window.location.href.includes('iqac')) return 'IQAC';
  if (window.location.href.includes('faculty')) return 'Faculty';
  if (window.location.href.includes('principal')) return 'Principal';
  if (window.location.href.includes('management')) return 'Management';
  return 'User';
}

function getMessages() {
  return JSON.parse(localStorage.getItem(MESSAGING_KEY) || '[]');
}

function saveMessage(msg) {
  const messages = getMessages();
  // Add id, username
  msg.id = Date.now() + '_' + Math.random().toString(36).slice(2,8);
  msg.username = getUsername();
  messages.push(msg);
  localStorage.setItem(MESSAGING_KEY, JSON.stringify(messages));
}

function canDeleteMessage(msg) {
  const role = getRole();
  const username = getUsername();
  // IQAC, Principal, Management can delete all
  if (["IQAC","Principal","Management"].includes(role)) return true;
  // Sender can delete their own
  return msg.username === username;
}

function deleteMessage(id) {
  let messages = getMessages();
  messages = messages.filter(m => m.id !== id);
  localStorage.setItem(MESSAGING_KEY, JSON.stringify(messages));
  renderMessages();
}

function clearMessages() {
  // Only IQAC, Principal, Management can clear all
  const role = getRole();
  if (["IQAC","Principal","Management"].includes(role)) {
    localStorage.removeItem(MESSAGING_KEY);
    renderMessages();
  }
}

function renderMessages() {
  const messages = getMessages();
  const list = document.getElementById('messageList');
  if (!list) return;
  list.innerHTML = '';
  messages.forEach(m => {
    const div = document.createElement('div');
    div.className = 'mb-2 p-2 rounded bg-gray-100 flex justify-between items-center';
    div.innerHTML = `<div><span class='font-bold text-pmcPurple'>${m.role}:</span> <span style='color:#111'>${m.text}</span></div>`;
    if (canDeleteMessage(m)) {
      const delBtn = document.createElement('button');
      delBtn.textContent = '🗑️';
      delBtn.title = 'Delete';
      delBtn.className = 'ml-2 text-red-500 hover:text-red-700 text-lg';
      delBtn.onclick = () => deleteMessage(m.id);
      div.appendChild(delBtn);
    }
    list.appendChild(div);
  });
  list.scrollTop = list.scrollHeight;
}

function openMessagingModal() {
  document.getElementById('messagingModal').classList.remove('hidden');
  renderMessages();
}

function closeMessagingModal() {
  document.getElementById('messagingModal').classList.add('hidden');
}

function sendMessage() {
  const input = document.getElementById('messageInput');
  const text = input.value.trim();
  if (!text) return;
  saveMessage({ role: getRole(), text });
  input.value = '';
  renderMessages();
}

document.addEventListener('DOMContentLoaded', () => {
  // For live update if multiple tabs
  window.addEventListener('storage', e => {
    if (e.key === MESSAGING_KEY) renderMessages();
  });
  // Always render messages if modal is already open (e.g. after reload)
  const modal = document.getElementById('messagingModal');
  if (modal && !modal.classList.contains('hidden')) {
    renderMessages();
  }
});
