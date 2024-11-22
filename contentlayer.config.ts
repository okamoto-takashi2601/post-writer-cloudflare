// contentlayer.config.ts
import {defineDocumentType, makeSource} from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {type: 'string', required: true},
    description: {type: 'string'},
    image: {type: "string", required: true},
    date: {type: 'date', required: true},
    published: {type: 'boolean', required: true},
    authors: {type: 'string'},
  },
  computedFields: {
    slug: {type: 'string', resolve: (doc) => `/${doc._raw.flattenedPath}`},
    slugAsPramams: {type: 'string', resolve: (doc) => `${doc._raw.flattenedPath.split("/").splice(1)[0]}`},
  },
}))

export default makeSource({contentDirPath: './content', documentTypes: [Post]})
