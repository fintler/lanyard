/*global goog, lanyard */
/*jslint white: false, onevar: false, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: false, regexp: true, newcap: true, immed: true, sub: true, nomen: false */

goog.provide('lanyard.util.Texture');

/**
 * Represent an OpenGL texture object.
 *
 * @constructor
 * @param {*} gl the current webgl context.
 */
lanyard.util.Texture = function (gl) {
    /** @private */ this._logger = goog.debug.Logger.getLogger('lanyard.util.Texture');

    if(!gl) {
        this._logger.severe("Creation of a texture was attempted without a valid gl context.");
    }

    this.gl = gl;
    this.tex = gl.createTexture(); 
};

/**
 * Binds this texture to the current GL context.
 */
lanyard.util.Texture.prototype.bind = function () {
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.tex);
};

/**
 * Updates the entire content area of this texture using the data in the given canvas.
 *
 * @param {Element} textureCanvas the canvas that holds the texture.
 */
lanyard.util.Texture.prototype.updateCanvas = function (textureCanvas) {
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, textureCanvas);
    this.createMipmap();
};

/**
 * Sets this texture to the image.
 *
 * @param {Image} imagee the image to use for this texture.
 */
lanyard.util.Texture.prototype.setImage = function (image) {
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, image, true);
};

/**
 * Generate a mipmap for this texture.
 */
lanyard.util.Texture.prototype.createMipmap = function () {
    this.gl.generateMipmap(this.gl.TEXTURE_2D);
};

/**
 * Sets the OpenGL integer texture parameter for the texture's target.
 *
 * @param {number} parameterName the parameter name.
 * @param {number} value the value to set the parameter to.
 */
lanyard.util.Texture.prototype.setTexParameteri = function (parameterName, value) {
    this.gl.texParameteri(this.gl.TEXTURE_2D, parameterName, value); 
};

/* EOF */
