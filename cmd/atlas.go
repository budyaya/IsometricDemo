package cmd

import (
	"fmt"
	"log"
	"os"
	"path"

	"IsometricDemo/cmd/meta"

	"github.com/spf13/cobra"
)

var atlasCmd = &cobra.Command{
	Use:   "atlas",
	Short: "转化格式",
	Long:  `转化 atlas 格式`,
	//Args:  cobra.MinimumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("读取atlas", atlassrc)
		dst := path.Join("./assets/character", path.Base(atlassrc))
		content, err := os.ReadFile(dst)
		if err != nil {
			log.Fatal(err)
			return
		}
		meta.Convert(path.Base(atlassrc), content)

	},
}

var atlassrc string

func init() {
	atlasCmd.Flags().StringVarP(&atlassrc, "src", "s", "", "atlas 路径")
	atlasCmd.MarkFlagRequired("src")
}
