/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

'use strict';

( function() {
	CKEDITOR.dialog.add( 'link', function( editor ) {
		var plugin = CKEDITOR.plugins.link;

		// Handles the event when the "Target" selection box is changed.
		var targetChanged = function() {
				var dialog = this.getDialog(),
					popupFeatures = dialog.getContentElement( 'target', 'popupFeatures' ),
					targetName = dialog.getContentElement( 'target', 'linkTargetName' ),
					value = this.getValue();

				if ( !popupFeatures || !targetName )
					return;

				popupFeatures = popupFeatures.getElement();
				popupFeatures.hide();
				targetName.setValue( '' );

				switch ( value ) {
					case 'frame':
						targetName.setLabel( editor.lang.link.targetFrameName );
						targetName.getElement().show();
						break;
					case 'popup':
						popupFeatures.show();
						targetName.setLabel( editor.lang.link.targetPopupName );
						targetName.getElement().show();
						break;
					default:
						targetName.setValue( value );
						targetName.getElement().hide();
						break;
				}

			};

		// Handles the event when the "Type" selection box is changed.
		var linkTypeChanged = function() {
				var dialog = this.getDialog(),
					partIds = [ 'urlOptions', 'emailOptions', 'documentOptions' ],
					typeValue = this.getValue(),
					uploadTab = dialog.definition.getContents( 'upload' ),
					uploadInitiallyHidden = uploadTab && uploadTab.hidden;

				if ( typeValue == 'url' ) {
					if ( editor.config.linkShowTargetTab )
						dialog.showPage( 'target' );
					if ( !uploadInitiallyHidden )
						dialog.showPage( 'upload' );
				} else {
					dialog.hidePage( 'target' );
					if ( !uploadInitiallyHidden )
						dialog.hidePage( 'upload' );
				}

				for ( var i = 0; i < partIds.length; i++ ) {
					var element = dialog.getContentElement( 'info', partIds[ i ] );
					if ( !element )
						continue;

					element = element.getElement().getParent().getParent();
					if ( partIds[ i ] == typeValue + 'Options' )
						element.show();
					else
						element.hide();
				}

				dialog.layout();
			};

		var setupParams = function( page, data ) {
				if ( data[ page ] )
					this.setValue( data[ page ][ this.id ] || '' );
			};

		var setupPopupParams = function( data ) {
				return setupParams.call( this, 'target', data );
			};

		var setupAdvParams = function( data ) {
				return setupParams.call( this, 'advanced', data );
			};

		var commitParams = function( page, data ) {
				if ( !data[ page ] )
					data[ page ] = {};

				data[ page ][ this.id ] = this.getValue() || '';
			};

		var commitPopupParams = function( data ) {
				return commitParams.call( this, 'target', data );
			};

		var commitAdvParams = function( data ) {
				return commitParams.call( this, 'advanced', data );
			};

		var commonLang = editor.lang.common,
			linkLang = editor.lang.link,
			anchors;

		return {
			title: linkLang.title,
			minWidth: 350,
			minHeight: 110,
			resizable: CKEDITOR.DIALOG_RESIZE_NONE,
			buttons: [ CKEDITOR.dialog.removeButton, CKEDITOR.dialog.okButton ],
			contents: [ {
				id: 'info',
				label: linkLang.info,
				title: linkLang.info,
				elements: [ {
					id: 'linkType',
					type: 'radio',
					'default': 'url',
					className: 'cke_dialog_link_type',
					items: [
						[ linkLang.toWeb, 'url' ],
						[ linkLang.toEmail, 'email' ],
						[ linkLang.toDocument, 'document' ],
					],
					onChange: linkTypeChanged,
					setup: function( data ) {
						this.setValue( data.type || 'url' );
					},
					commit: function( data ) {
						data.type = this.getValue();
					}
				},
				{
					type: 'vbox',
					id: 'urlOptions',
					className: 'cke_dialog_web',
					children: [ {
						type: 'text',
						id: 'url',
						label: linkLang.url,
						labelLayout: 'horizontal',
						className: 'cke_dialog_url',
						widths: [ '70px' ],
						onLoad: function() {
							this.getInputElement().setAttribute('placeholder', linkLang.urlPlaceholder);
						},
						validate: function() {
							var dialog = this.getDialog();

							if ( dialog.getContentElement( 'info', 'linkType' ) && dialog.getValueOf( 'info', 'linkType' ) != 'url' )
								return true;

							if ( !editor.config.linkJavaScriptLinksAllowed && ( /javascript\:/ ).test( this.getValue() ) ) {
								alert( commonLang.invalidValue ); // jshint ignore:line
								return false;
							}

							if ( this.getDialog().fakeObj ) // Edit Anchor.
							return true;
						},
						setup: function( data ) {
							this.allowOnChange = false;
							if ( data.web )
								this.setValue( data.web.url );
							else
								this.setValue( '' );
							this.allowOnChange = true;
						},
						onKeyUp: function() {
							this.onChange();
						},
						onChange: function() {
							var url = this.getValue();
							var dialog = this.getDialog();
							var target = dialog.getContentElement( 'info', 'linkTargetType' );
							if ( /^#/.test(url) ) {
								target.disable();
							} else {
								target.enable();
							}
						},
						commit: function( data ) {
							if ( !data.web )
								data.web = {};

							data.web.url = this.getValue();
							this.allowOnChange = false;
						}
					},
					{
						type: 'checkbox',
						id: 'linkTargetType',
						label: linkLang.openInNewTab,
						className: 'cke_dialog_new_tab',
						setup: function( data ) {
							if ( data.web ) {
								this.setValue( data.web.openInNewTab );
							}
						},
						commit: function( data ) {
							if ( !data.web )
								data.web = {};

							data.web.openInNewTab = !!this.getValue();
						}
					} ]
				},
				{
					type: 'text',
					id: 'emailOptions',
					label: linkLang.emailAddress,
					labelLayout: 'horizontal',
					widths: [ '70px' ],
					className: 'cke_dialog_email',
					onLoad: function() {
						this.getInputElement().setAttribute('placeholder', linkLang.emailPlaceholder);
					},
					validate: function() {
						var dialog = this.getDialog();
						var emailRegex = /.+@.+\..+/;

						if ( !dialog.getContentElement( 'info', 'linkType' ) || dialog.getValueOf( 'info', 'linkType' ) != 'email' )
							return true;

						if (!emailRegex.test( this.getValue() )) {
							alert( linkLang.invalidEmail );
							return false;
						}
					},
					setup: function( data ) {
						var linkType = this.getDialog().getContentElement( 'info', 'linkType' );

						if ( !linkType )
							this.getElement().hide();

						if ( data.email )
							this.setValue( data.email.address );

						if ( linkType && linkType.getValue() == 'email' )
							this.select();
					},
					commit: function( data ) {
						if ( !data.email )
							data.email = {};

						data.email.address = this.getValue();
					}
				},
				{
					type: 'vbox',
					id: 'documentOptions',
					children: [ {
						type: 'hbox',
						widths: [ '10px' ],
						children: [ {
							type: 'button',
							id: 'upload',
							label: linkLang.upload,
							className: 'cke_dialog_upload',
							onLoad: function() {
								var span = this.getElement().getChild([0]);
								var html = span.getHtml();
								html = '<i class="entypo-upload"></i> ' + html;
								span.setHtml( html );
							},
							onClick: function() {
								var dialog = this.getDialog();
								editor.config.uploadCallback(function(url) {
									var uploadUrl = dialog.getContentElement( 'info', 'uploadUrl' );
									uploadUrl.setValue( url || '' );
								});
							}
						}, {
							type: 'text',
							id: 'uploadUrl',
							className: 'cke_dialog_upload_url',
							onLoad: function() {
								this.getInputElement().setAttribute('readonly', 'readonly');
							},
							setup: function ( data ) {
								if ( data.document )
									this.setValue( data.document.url );
								else
									this.setValue( '' );
							},
							onChange: function() {
								var url = this.getValue( url );
								var dialog = this.getDialog();
								var uploadTarge = dialog.getContentElement( 'info', 'uploadLinkTargetType' );
								this.getElement()[ url ? 'show' : 'hide' ]();
								uploadTarge.getElement()[ url ? 'show' : 'hide' ]();
							},
							commit: function ( data ) {
								if ( !data.document )
									data.document = {};
								data.document.url = this.getValue();
							}
						} ]
					}, {
						type: 'checkbox',
						id: 'uploadLinkTargetType',
						label: linkLang.openInNewTab,
						className: 'cke_dialog_new_tab',
						setup: function( data ) {
							if ( data.document )
								this.setValue( data.document.openInNewTab );
						},
						commit: function( data ) {
							if ( !data.document )
								data.document = {};

							data.document.openInNewTab = this.getValue();
						}
					} ]
				} ]
			}],
			onShow: function() {
				var editor = this.getParentEditor(),
					selection = editor.getSelection(),
					element = null;

				// Fill in all the relevant fields if there's already one link selected.
				if ( ( element = plugin.getSelectedLink( editor ) ) && element.hasAttribute( 'href' ) ) {
					// Don't change selection if some element is already selected.
					// For example - don't destroy fake selection.
					if ( !selection.getSelectedElement() )
						selection.selectElement( element );
				} else {
					element = null;
				}

				var data = plugin.parseLinkAttributes( editor, element );

				var hideRemove = false;
				var removeLabel = linkLang.removeLink;
				switch ( data.type ) {
					case 'email':
						if (!data.email.address)
							hideRemove = true;
						else
							removeLabel = linkLang.removeEmail;
						break;
					case 'url':
						if (!data.web.url)
							hideRemove = true;
						break;
					case 'document':
						if (!data.document.url)
							hideRemove = true;
						else
							removeLabel = linkLang.removeDocument;
						break;
					default:
						hideRemove = true;
						break;
				}
				var removeButton = this.getButton( 'remove' ).getElement();
				if (hideRemove) {
					removeButton.hide();
				} else {
					removeButton.getChild( [0] ).setText( removeLabel );
					removeButton.show();
				}

				// Record down the selected element in the dialog.
				this._.selectedElement = element;

				this.setupContent( data );
			},
			onOk: function() {
				var data = {};

				// Collect data from fields.
				this.commitContent( data );

				var selection = editor.getSelection(),
					attributes = plugin.getLinkAttributes( editor, data );

				if (data.type === 'email' && !data.email.address || data.type === 'url' && !data.web.url || data.type === 'document' && !data.document.url) {
					editor.execCommand('unlink');
					return;
				}

				if ( !this._.selectedElement ) {
					var range = selection.getRanges()[ 0 ];

					// Use link URL as text with a collapsed cursor.
					if ( range.collapsed ) {
						// Short mailto link text view (#5736).
						var text = new CKEDITOR.dom.text( data.type == 'email' ?
							data.email.address : attributes.set[ 'data-cke-saved-href' ], editor.document );
						range.insertNode( text );
						range.selectNodeContents( text );
					}

					// Apply style.
					var style = new CKEDITOR.style( {
						element: 'a',
						attributes: attributes.set
					} );

					style.type = CKEDITOR.STYLE_INLINE; // need to override... dunno why.
					style.applyToRange( range, editor );
					range.select();
				} else {
					// We're only editing an existing link, so just overwrite the attributes.
					var element = this._.selectedElement,
						href = element.data( 'cke-saved-href' ),
						textView = element.getHtml();

					element.setAttributes( attributes.set );
					element.removeAttributes( attributes.removed );

					// Update text view when user changes protocol (#4612).
					if ( href == textView || data.type == 'email' && textView.indexOf( '@' ) != -1 ) {
						// Short mailto link text view (#5736).
						element.setHtml( data.type == 'email' ?
							data.email.address : attributes.set[ 'data-cke-saved-href' ] );

						// We changed the content, so need to select it again.
						selection.selectElement( element );
					}

					delete this._.selectedElement;
				}
			},
			onRemove: function() {
				editor.execCommand('unlink');
			},
			// Inital focus on 'url' field if link is of type URL.
			onFocus: function() {
				var linkType = this.getContentElement( 'info', 'linkType' ),
					urlField;

				if ( linkType && linkType.getValue() == 'url' ) {
					urlField = this.getContentElement( 'info', 'url' );
					urlField.select();
				}
			}
		};
	} );
} )();
// jscs:disable maximumLineLength
/**
 * The e-mail address anti-spam protection option. The protection will be
 * applied when creating or modifying e-mail links through the editor interface.
 *
 * Two methods of protection can be chosen:
 *
 * 1. The e-mail parts (name, domain, and any other query string) are
 *     assembled into a function call pattern. Such function must be
 *     provided by the developer in the pages that will use the contents.
 * 2. Only the e-mail address is obfuscated into a special string that
 *     has no meaning for humans or spam bots, but which is properly
 *     rendered and accepted by the browser.
 *
 * Both approaches require JavaScript to be enabled.
 *
 *		// href="mailto:tester@ckeditor.com?subject=subject&body=body"
 *		config.emailProtection = '';
 *
 *		// href="<a href=\"javascript:void(location.href=\'mailto:\'+String.fromCharCode(116,101,115,116,101,114,64,99,107,101,100,105,116,111,114,46,99,111,109)+\'?subject=subject&body=body\')\">e-mail</a>"
 *		config.emailProtection = 'encode';
 *
 *		// href="javascript:mt('tester','ckeditor.com','subject','body')"
 *		config.emailProtection = 'mt(NAME,DOMAIN,SUBJECT,BODY)';
 *
 * @since 3.1
 * @cfg {String} [emailProtection='' (empty string = disabled)]
 * @member CKEDITOR.config
 */
