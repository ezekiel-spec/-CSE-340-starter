/* ----- MOBILE FIRST STYLES (Default) ----- */
* {
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    background-color: #f4f4f4;
}

.home-container {
    padding: 10px;
    max-width: 1200px;
    margin: 0 auto;
}

/* Hero Section - Mobile Stacked */
.hero-section {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: white;
    margin-bottom: 20px;
}

.hero-content {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 15px;
    z-index: 1;
}

.hero-title {
    color: #00a0c6;
    margin-top: 0;
}

.hero-button {
    background-color: #00a0c6;
    color: black;
    padding: 10px 20px;
    border: none;
    font-weight: bold;
    cursor: pointer;
}

.hero-image {
    width: 100%;
    height: auto;
}

/* Upgrades & Reviews - Mobile Single Column */
.details-grid {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.upgrade-items {
    display: grid;
    grid-template-columns: 1fr 1fr; /* 2x2 on mobile */
    gap: 10px;
}

.upgrade-card {
    background-color: #00a0c6;
    text-align: center;
    padding: 10px;
    border: 1px solid #ccc;
}

.img-box {
    background-color: white;
    margin-bottom: 5px;
    padding: 5px;
}

.upgrade-card img {
    height: 50px;
    width: auto;
}

/* ----- LARGE SCREEN STYLES (Media Query) ----- */
@media screen and (min-width: 768px) {
    /* Hero Overlay for Large Screen */
    .hero-content {
        position: absolute;
        top: 50px;
        left: 50px;
        border: 1px solid #00a0c6;
    }

    /* Side-by-Side Layout */
    .details-grid {
        flex-direction: row;
        align-items: flex-start;
    }

    .upgrades-section {
        flex: 1;
        order: 1;
    }

    .reviews-section {
        flex: 1;
        order: 2;
    }
}