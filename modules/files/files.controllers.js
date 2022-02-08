// the controller is going to retrieve the url of the file that the multer middleware attached to the request and
// return it to the client
function updloadImage(req, res) {
  try {
    const { path: imageUrl } = req.file;
    res.status(200).json({ imageUrl });
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = { updloadImage };
