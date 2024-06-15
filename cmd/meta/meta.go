package meta

import (
	"encoding/json"
	"fmt"
)

type MetaInfo struct {
	Frames map[string]Png `json:"frames"`
	Meta   Meta           `json:"meta"`
}

type FrameSize struct {
	X int `json:"x"`
	Y int `json:"y"`
	W int `json:"w"`
	H int `json:"h"`
}

type Size struct {
	W int `json:"w"`
	H int `json:"h"`
}

type Png struct {
	Frame            FrameSize `json:"frame"`
	Rotated          bool      `json:"rotated"`
	Trimmed          bool      `json:"trimmed"`
	SpriteSourceSize FrameSize `json:"spriteSourceSize"`
	SourceSize       Size      `json:"sourceSize"`
}

type Meta struct {
	App     string `json:"app"`
	Version string `json:"version"`
	Image   string `json:"image"`
	Format  string `json:"format"`
	Size    Size   `json:"size"`
	Scale   string `json:"scale"`
}

func Generate(name string, num int, width int, height int) {
	info := MetaInfo{
		Meta: Meta{
			App:     "arpg",
			Version: "1.0",
			Image:   fmt.Sprintf("%s.png", name),
			Format:  "RGBA8888",
			Size:    Size{W: width, H: height},
			Scale:   "1",
		},
		Frames: make(map[string]Png),
	}

	w := width / num
	h := height / 4
	for i := 0; i < 4; i++ {
		for j := 0; j < num; j++ {
			info.Frames[fmt.Sprintf("%s%d%d.png", name, i, j)] = Png{
				Frame: FrameSize{
					X: j * w,
					Y: i * h,
					W: w,
					H: h,
				},
				Rotated: false,
				Trimmed: false,
				SpriteSourceSize: FrameSize{
					X: 0,
					Y: 0,
					W: w,
					H: h,
				},
				SourceSize: Size{
					W: w,
					H: h,
				},
			}
		}
	}
	b, err := json.MarshalIndent(&info, "", "  ")
	fmt.Println(string(b), err)
}
