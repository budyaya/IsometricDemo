package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var (
	rootCmd = &cobra.Command{
		Use:          "demo",
		Short:        "工具",
		Long:         `说明`,
		SilenceUsage: true,
		Args: func(cmd *cobra.Command, args []string) error {

			return nil
		},
		PersistentPreRunE: func(*cobra.Command, []string) error { return nil },
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Println("欢迎使用")
		},
	}
)

func init() {
	rootCmd.AddCommand(versionCmd)
	rootCmd.AddCommand(metaCmd)
	rootCmd.AddCommand(atlasCmd)
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		os.Exit(-1)
	}
}
