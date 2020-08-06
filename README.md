# GitHub Action - Releases API

This GitHub Action (written in JavaScript) wraps the [GitHub Release API](https://developer.github.com/v3/repos/releases/), specifically the [Download a Release Asset](https://developer.github.com/v3/repos/releases/#get-a-release-asset) endpoint, to allow you to leverage GitHub Actions to download release assets.

## Usage

### Inputs

- `release_tag`: The tag of release that saved the asset
- `asset_name` : The name of the asset you want to download
- `repository` : The full repository name eg: action/download-release-asset

### Outputs

- `file_name`: The downloaded asset file name

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
