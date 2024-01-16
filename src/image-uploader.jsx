import { Component, createRef, Fragment } from "react"

export class ImageUploader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imagesUrl: []
        }
        // the images files
        this.images = []

        // input to replace image
        this.replaceImageInput = createRef()
        this.addImageLabel = createRef()

        // edit images functions
        this.addImages = this.addImages.bind(this)
        this.replaceImage = this.replaceImage.bind(this)
        this.removeImage = this.removeImage.bind(this)
        this.uploadImages = this.uploadImages.bind(this)

        // jsx DOM
        this.addImageButton = this.addImageButton.bind(this)
        this.previewImage = this.previewImage.bind(this)
    }

    async addImages(e) {
        const selectedImages = Array.from(e.target.files) // array from the image files in the principal input
        const imagesUrlBackup = [...this.state.imagesUrl] // backup the images url
        if (imagesUrlBackup.length + selectedImages.length <= 3) {
            const fileReader = new FileReader()
            
            for (let iteration = 0, limit = selectedImages.length; iteration < limit; iteration++) {
                this.images.push(selectedImages[iteration]) // add the image file
                // the DOM section
                const promise = new Promise((resolve) => {
                    fileReader.onload = (e) => {
                        imagesUrlBackup.push(e.target.result)
                        resolve()
                    }
                    fileReader.readAsDataURL(selectedImages[iteration])
                })
                await promise
            }
            this.setState({
                imagesUrl: imagesUrlBackup
            })
        } else {
            alert('Vous ne pouvez choisir plus que 3 images au total')
        }
    }

    replaceImage(index) {        
        const replaceImageInput = this.replaceImageInput.current // the replace input
        this.images[index] = replaceImageInput.files[0] // replace the image file -----------------------------------------------------
        // the DOM section
        const imagesUrlBackup = [...this.state.imagesUrl] // backup the images url
        const fileReader = new FileReader()

        fileReader.onload = (e) => { // 3 when the reading of the src ends
            imagesUrlBackup[index] = e.target.result // replace the image url in the backup
            this.setState({imagesUrl: imagesUrlBackup}) // replace the state by the backup (render)
        }
        replaceImageInput.onchange = (e) => { // 2 when the input changes
            fileReader.readAsDataURL(e.target.files[0]) // read the image src
        }
        replaceImageInput.click() // 1 automatic click to open the input
    }

    removeImage(index) {
        this.images.splice(index, 1) // remove the image file -----------------------------------------------------------------------------
        // the DOM section
        const imagesUrlBackup = [...this.state.imagesUrl] // backup the images url
        imagesUrlBackup.splice(index, 1) // remove the image url in the backup
        this.setState({
            imagesUrl: imagesUrlBackup // replace the state by the backup (render)
        })
    }

    addImageButton() {
        return <Fragment>
            <div className="add-image-button">
                <input onChange={this.addImages} type="file" id="add-images" name="add-images" accept="image/*" multiple="multiple" style={{ display: 'none' }} />
                <input ref={this.replaceImageInput} type="file" id="replace-image" name="replace-image" accept="image/*" style={{ display: 'none' }} />
                <div className="buttons">
                    {
                        this.images.length < 3 && (<label ref={this.addImageLabel} htmlFor="add-images" >ADD <i className="fa-solid fa-image"></i></label>)
                    }
                    <button className="upload-images" onClick={this.uploadImages}>UPLOAD <i className="fa-solid fa-upload"></i></button>
                </div>
            </div>
        </Fragment>
    }

    previewImage() {
        const imagesUrl = this.state.imagesUrl

        if (imagesUrl.length) {
            return <Fragment>
                <div className="preview-images">
                    <div className="primary">
                        {
                            <div className="img-container">
                                <div className="overlay-actions">
                                    <i className="fas fa-trash" onClick={() => this.removeImage(0)}></i>
                                    <i className="fas fa-exchange" onClick={() => this.replaceImage(0)}></i>
                                </div>
                                <img src={imagesUrl[0]} alt="primary" style={{ maxWidth: '100%', height: 'auto' }} />
                            </div>
                        }
                    </div>
                    {
                        imagesUrl.length > 1 && (
                            <div className="sub-images">
                                {
                                    imagesUrl.map((image, index) => (
                                        index !== 0 && // dismiss the primary
                                        <div key={'img-container' + index} className="img-container">
                                            <div key={'overlay-actions-' + index} className="overlay-actions">
                                                <i key={'fa-trash-' + index} className={'fas fa-trash'} onClick={() => this.removeImage(index)}></i>
                                                <i key={'fa-exchange-' + index} className={'fas fa-exchange'} onClick={() => this.replaceImage(index)}></i>
                                            </div>
                                            <img key={'sub-image' + index} src={image} alt={'sub-image' + index} style={{ maxHeight: '100px', width: 'auto' }} />
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </Fragment>
        }
    }

    uploadImages() {
        const formData = new FormData()
        const url = 'http://localhost/image-uploader-test/index.php'

        this.images.forEach((imageFile, index) => {
            formData.append(`image-${index}`, imageFile)
        })

        fetch(url, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text())
        .then(responseText => {
            alert(responseText)
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi du fichier :', error);
        })
    }

    render() {
        return <div className="image-uploader">
            {this.previewImage()}
            {this.addImageButton()}
        </div>
    }
}