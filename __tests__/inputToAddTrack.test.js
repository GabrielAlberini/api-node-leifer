import { validateTrack, validatePartialTrack } from "../validators/tracks.js";

describe("validateTrack function", () => {
  test("should return success true when track data is valid", () => {
    const validTrackData = {
      name: "Canción de ejemplo",
      album: "Álbum de ejemplo",
      cover: "https://example.com/cover.jpg",
      artist: {
        name: "Artista de ejemplo",
        nickname: "Apodo de ejemplo",
        nationality: "Nacionalidad de ejemplo",
      },
      duration: {
        start: 0,
        end: 180,
      },
      mediaId: "6074e105ac83c317d0c2fd2a",
    };

    const validationResult = validateTrack(validTrackData);

    expect(validationResult.success).toBe(true);
  });

  test("should return success true when partial track data is valid", () => {
    const partialTrackData = {
      name: "Artista de ejemplo",
      album: "Album de ejemplo",
    };

    const validationResult = validatePartialTrack(partialTrackData);

    expect(validationResult.success).toBe(true);
  });
});
