const postsContainer = document.getElementById('posts-container');
const paginationContainer = document.getElementById('pagination-container');
const limit = 10;
let currentPage = 5;
let totalPosts = 0;

async function getPosts() {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${currentPage}`
    );
    const data = await response.json();
    totalPosts = +response.headers.get('x-total-count');
    showPosts(data);
    showPagination();
  } catch (error) {
    console.error(error);
  }
}

function showPosts(posts) {
  let output = '';
  posts.forEach((post) => {
    output += `
      <div class="post">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;
  });
  postsContainer.innerHTML = output;
}

function showPagination() {
  const totalPages = Math.ceil(totalPosts / limit);
  let output = '';

  if (currentPage > 1) {
    output += `<div class="pagination-btn" onclick="prevPage()">Previous</div>`;
  }

  if (totalPages <= 9) {
    for (let i = 1; i <= totalPages; i++) {
      output += `<div class="pagination-btn ${
        i === currentPage ? 'active' : ''
      }" onclick="goToPage(${i})">${i}</div>`;
    }
  } else {
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        output += `<div class="pagination-btn ${
          i === currentPage ? 'active' : ''
        }" onclick="goToPage(${i})">${i}</div>`;
      }
      output += `<div class="pagination-btn">...</div>`;
      output += `<div class="pagination-btn" onclick="goToPage(${totalPages})">${totalPages}</div>`;
    } else if (currentPage > 4 && currentPage < totalPages - 3) {
      output += `<div class="pagination-btn" onclick="goToPage(1)">1</div>`;
      output += `<div class="pagination-btn">...</div>`;
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        output += `<div class="pagination-btn ${
          i === currentPage ? 'active' : ''
        }" onclick="goToPage(${i})">${i}</div>`;
      }
      output += `<div class="pagination-btn">...</div>`;
      output += `<div class="pagination-btn" onclick="goToPage(${totalPages})">${totalPages}</div>`;
    } else {
      output += `<div class="pagination-btn" onclick="goToPage(1)">1</div>`;
      output += `<div class="pagination-btn">...</div>`;
      for (let i = totalPages - 4; i <= totalPages; i++) {
        output += `<div class="pagination-btn ${
          i === currentPage ? 'active' : ''
        }" onclick="goToPage(${i})">${i}</div>`;
      }
    }
  }

  if (currentPage < totalPages) {
    output += `<div class="pagination-btn" onclick="nextPage()">Next</div>`;
  }

  paginationContainer.innerHTML = output;
}

function goToPage(page) {
  currentPage = page;
  getPosts();
}

function prevPage() {
  currentPage--;
  getPosts();
}

function nextPage() {
  currentPage++;
  getPosts();
}

getPosts();
