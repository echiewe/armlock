document.addEventListener('DOMContentLoaded', function () {
    const lowLoadFaq = document.querySelector(".low-load-prolonged-stretch");
    const typeTennisElbowFaq = document.querySelector(".type-tennis-elbow");
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('question');

    if (searchParam) {
        if (searchParam === 'low-load-prolonged-stretch') {
            lowLoadFaq.open = true;
            lowLoadFaq.querySelector('summary').classList.add('selected');
        } else if (searchParam === 'type-tennis-elbow') {
            typeTennisElbowFaq.open = true;
            typeTennisElbowFaq.querySelector('summary').classList.add('selected');
        }
    }
});