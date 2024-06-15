package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "打印版本号",
	Long:  `查看工具版本号`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("工具版本号 v0.1")
	},
}
