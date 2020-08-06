# GitHub Action - Releases API

This GitHub Action (written in JavaScript) wraps the [GitHub Release API](https://developer.github.com/v3/repos/releases/), specifically the [Download a Release Asset](https://developer.github.com/v3/repos/releases/#get-a-release-asset) endpoint, to allow you to leverage GitHub Actions to download release assets.

## Usage

### Inputs

- `release_tag`: (required) The tag of release that saved the asset.set the "latest" to use the latest release version.
- `asset_name` : (required) The name of the asset you want to download
- `repository` : (option) The full repository name eg: action/download-release-asset

### Outputs

- `file_name`: The downloaded asset file name

### Example workflow

```yaml
    - name: download a asset
      uses: nttdata-maas/download-release-asset@master
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        release_tag: ${{ github.event.inputs.version }}
        asset_name: xxxx.zip
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
