package cmd

import (
	"path"
	"strings"
)

func BaseFilename(filename string) string {
	filenameWithSuffix := path.Base(filename)

	fileSuffix := path.Ext(filenameWithSuffix)

	return strings.TrimSuffix(filenameWithSuffix, fileSuffix)
}
