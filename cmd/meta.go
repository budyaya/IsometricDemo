package cmd

import (
	"fmt"
	"image/png"
	"os"
	"path"

	"IsometricDemo/cmd/meta"

	"github.com/spf13/cobra"
)

var metaCmd = &cobra.Command{
	Use:   "meta",
	Short: "生成资源文件",
	Long:  `根据图片生成资源文件`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("读取图片", imgsrc)
		dst := path.Join("./assets/character", path.Base(imgsrc))
		file, err := os.Open(dst)
		if err != nil {
			panic(err)
		}
		defer file.Close()

		img, err := png.Decode(file)
		if err != nil {
			panic(err)
		}

		bounds := img.Bounds()
		fmt.Printf("Width: %d\nHeight: %d\n", bounds.Dx(), bounds.Dy())
		meta.Generate(BaseFilename(imgsrc), num, bounds.Dx(), bounds.Dy())

	},
}

var imgsrc string
var num int

func init() {
	metaCmd.Flags().StringVarP(&imgsrc, "img", "i", "", "图片源")
	metaCmd.MarkFlagRequired("img")

	metaCmd.Flags().IntVarP(&num, "num", "n", 0, "帧数")
	metaCmd.MarkFlagRequired("num")
}
