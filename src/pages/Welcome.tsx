import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, theme } from 'antd';
import React from 'react';
import imageUrl1 from '../../public/dummy_images/oneplay.jpeg';
import imageUrl2 from '../../public/dummy_images/twoplay.jpeg';
import imageUrl3 from '../../public/dummy_images/threeplay.jpeg';
/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
  imageUrl: string;
}> = ({ title, href, index, desc, imageUrl }) => {
  const { useToken } = theme;

  const { token } = useToken();

  return (
    <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      background: '#fff',
      // background: `linear-gradient(to right, #bb41e0, #5ad9f2)`,
      boxShadow: token.boxShadow,
      borderRadius: '8px',
      fontSize: '14px',
      color: token.colorTextSecondary,
      lineHeight: '22px',
      padding: '16px 19px',
      minWidth: '220px',
      flex: 1,
    }}
  >
    <div
        style={{
          width: 200,
          height: 200,
          display: 'flex',
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
    <div
      style={{
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
      }}
    >
      
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage: "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div> */}
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
            paddingTop: 8,
          }}
        >
          {title}
        </div>
      </div>
    </div>
    <div
      style={{
        fontSize: '14px',
        color: token.colorTextSecondary,
        textAlign: 'justify',
        lineHeight: '22px',
        marginBottom: 8,
      }}
    >
      {desc}
    </div>
    <a href={href} target="_blank" rel="noreferrer">
      View Playlist {'>'}
    </a>
  </div>
  )  
};

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
          background: `linear-gradient(to right, #bb41e0, #5ad9f2 )`
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #bb41e0 0%, #bb41e0 100%)'
              : 'background-image: linear-gradient(75deg, #bb41e0 0%, #bb41e0 100%)',
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            DJ App Playlists
          </div>
          <p
            style={{
              fontSize: '14px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            Select songs from the playlists
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <InfoCard
              index={1}
              href="https://umijs.org/docs/introduce/introduce"
              title="New Music Friday"
              desc="The very best in new music from around the world. Cover: Normani" imageUrl={imageUrl2}              // style={{}}
            />
            <InfoCard
              index={2}
              title="New Joint"
              href="https://ant.design"
              desc="All the New Joints featuring YG, Gucci Mane, A Boogie and more!" imageUrl={imageUrl1}            />
            <InfoCard
              index={3}
              title="Feel good Friday"
              href="https://procomponents.ant.design"
              desc="Uplifting anthems to power you through 'til the weekend." imageUrl={imageUrl2}            />
            <InfoCard
              index={4}
              href="https://umijs.org/docs/introduce/introduce"
              title="New Music Friday"
              desc="The very best in new music from around the world. Cover: Normani" imageUrl={imageUrl2}            />
            <InfoCard
              index={5}
              title="New Joint"
              href="https://ant.design"
              desc="All the New Joints featuring YG, Gucci Mane, A Boogie and more!" imageUrl={imageUrl2}            />
            <InfoCard
              index={6}
              title="Feel good Friday"
              href="https://procomponents.ant.design"
              desc="Uplifting anthems to power you through 'til the weekend." imageUrl={imageUrl2}            />
            <InfoCard
              index={7}
              title="New Joint"
              href="https://ant.design"
              desc="All the New Joints featuring YG, Gucci Mane, A Boogie and more!" imageUrl={imageUrl3}            />
            <InfoCard
              index={8}
              title="Feel good Friday"
              href="https://procomponents.ant.design"
              desc="Uplifting anthems to power you through 'til the weekend." imageUrl={''}            />
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
