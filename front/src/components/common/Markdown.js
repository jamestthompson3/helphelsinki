import Remarkable from 'remarkable'

const md = new Remarkable('full', {
  html: true,
  xhtmlOut: false
})

const Markdown = props => md.render(props.children)

export default Markdown
