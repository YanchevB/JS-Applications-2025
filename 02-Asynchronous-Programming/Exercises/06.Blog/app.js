function attachEvents() {
    const postUrl = 'http://localhost:3030/jsonstore/blog/posts';
    const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';
    const selectRef = document.getElementById('posts');
    const titleRef = document.getElementById('post-title');
    const bodyRef = document.getElementById('post-body');
    const commentsRef = document.getElementById('post-comments');

    document.getElementById('btnLoadPosts').addEventListener('click', onLoad);

    document.getElementById('btnViewPost').addEventListener('click', onView);

    async function onLoad(e) {
        const response = await fetch(postUrl);
        const data = await response.json();
        Object.values(data).forEach(post => {
            const option = document.createElement('option');
            option.textContent = post.title;
            option.value = post.id;
            selectRef.appendChild(option);
        })
    }

    async function onView(e) {
        titleRef.textContent = '';
        bodyRef.textContent = '';
        commentsRef.textContent = '';

        const optionId = document.querySelector('#posts option:checked').value;

        const responsePosts = await fetch(postUrl);
        const dataPosts = await responsePosts.json();

        const responseComments = await fetch(commentsUrl);
        const dataComments = await responseComments.json();

        const post = Object.values(dataPosts).filter(post => post.id === optionId);
        const comments = Object.values(dataComments).filter(comments => comments.postId === optionId);

        titleRef.textContent = post[0].title;
        bodyRef.textContent = post[0].body;
        comments.forEach(comment => {
            const li = document.createElement('li');
            li.textContent = comment.text;
            commentsRef.appendChild(li);
        });
    }
}

attachEvents();