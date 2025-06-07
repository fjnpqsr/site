import React, { useEffect } from 'react';

export default function MediaEditor(props:any) {

	const {editorRef, setEditorRef}= props;
	useEffect(() => {
		if (editorRef) {
			return;
		}
		const { createEditor, createToolbar } = window.wangEditor;
		
		const editorConfig = {
			placeholder: 'Type here...',
			onChange(editor) {
				const html = editor.getHtml();
				console.log('editor content', html);
				props.onChange(html);
			},
		};

		const editor = createEditor({
			selector: '#editor-container',
			html: '<p><br></p>',
			config: editorConfig,
			mode: 'default', // or 'simple'
		});

		const toolbarConfig = {};

		createToolbar({
			editor,
			selector: '#toolbar-container',
			config: toolbarConfig,
			mode: 'default', // or 'simple'
		});
		setEditorRef(editor);
	}, [editorRef]);

	return (
		<div>
			<div id="editor—wrapper">
				<div id="toolbar-container"></div>
				<div id="editor-container"></div>
			</div>
		</div>
	);
}
