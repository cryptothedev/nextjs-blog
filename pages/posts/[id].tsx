import Layout from '../../components/Layout'
import { GetStaticPaths, GetStaticProps } from 'next'
import {
  getAllPostIds,
  getPostData,
  PostDataWithHtmlContent,
} from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/Date'
import utilStyles from '../../styles/utils.module.css'

type PostProps = {
  postData: PostDataWithHtmlContent
}

export default function Post({
  postData: { title, id, date, contentHtml },
}: PostProps) {
  return (
    <Layout home={false}>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </Layout>
  )
}

type StaticPathsResult = {
  id: string
}

export const getStaticPaths: GetStaticPaths<StaticPathsResult> = async () => {
  return { paths: getAllPostIds(), fallback: false }
}

export const getStaticProps: GetStaticProps<
  PostProps,
  StaticPathsResult
> = async ({ params }) => {
  if (!params) {
    throw new Error('params is undefined')
  }
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}
