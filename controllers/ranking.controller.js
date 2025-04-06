export const ranking = (req, res) => {
    res.sendFile('ranking.html', { root: 'public' });
};