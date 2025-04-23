fetch('perfil.json')
  .then(res => res.json())
  .then(data => {
    document.getElementById('avatar').src = data.avatar;
    document.getElementById('name').textContent = data.name;
    document.getElementById('bio').textContent = data.bio;
    const linksDiv = document.getElementById('links');
    data.links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.url;
      a.textContent = link.name;
      a.target = "_blank";
      linksDiv.appendChild(a);
    });
  });

document.getElementById('toggleTheme').onclick = () => {
  document.body.classList.toggle('dark');
}