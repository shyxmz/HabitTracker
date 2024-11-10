function isProductiveSite(siteURL, productiveSites){
    return productiveSites.some(site => siteURL.includes(site));
}
function isNonProductiveSite(siteURL, nonProductiveSites){
    return nonProductiveSites.some(site => siteURL.includes(site));
}
export { isProductiveSite, isNonProductiveSite };