package meta

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
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
	App     string      `json:"app"`
	Version string      `json:"version"`
	Image   string      `json:"image"`
	Format  string      `json:"format"`
	Size    Size        `json:"size"`
	Scale   json.Number `json:"scale"`
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

type MetaInfoArray struct {
	Frames FrameSlice `json:"frames"`
	Meta   Meta       `json:"meta"`
}
type Pivot struct {
	X float64 `json:"x"`
	Y float64 `json:"y"`
}
type Frames struct {
	Filename         string    `json:"filename"`
	Frame            FrameSize `json:"frame"`
	Rotated          bool      `json:"rotated"`
	Trimmed          bool      `json:"trimmed"`
	SpriteSourceSize FrameSize `json:"spriteSourceSize"`
	SourceSize       Size      `json:"sourceSize"`
	Pivot            Pivot     `json:"pivot"`
}

type FrameSlice []Frames

func (p FrameSlice) Len() int           { return len(p) }
func (p FrameSlice) Less(i, j int) bool { return p[i].Filename < p[j].Filename }
func (p FrameSlice) Swap(i, j int)      { p[i], p[j] = p[j], p[i] }

func Convert(filename string, content []byte) {
	info := MetaInfo{}
	err := json.Unmarshal(content, &info)
	if err != nil {
		log.Panic(err)
		return
	}
	info2 := MetaInfoArray{
		Frames: make([]Frames, 0),
		Meta:   info.Meta,
	}
	info2.Meta.App = "melonJS"
	for k, v := range info.Frames {
		info2.Frames = append(info2.Frames, Frames{
			Filename:         k,
			Frame:            v.Frame,
			Rotated:          v.Rotated,
			Trimmed:          v.Trimmed,
			SpriteSourceSize: v.SpriteSourceSize,
			SourceSize:       v.SourceSize,
			Pivot:            Pivot{X: 0.5, Y: 0.5},
		})
	}

	b, err := json.MarshalIndent(&info2, "", "  ")
	fmt.Println(string(b), err)

	err = os.WriteFile("convert-"+filename, b, 0644)
	if err != nil {
		panic(err)
	}
}
